import {
  ESLintUtils,
  ParserServicesWithTypeInformation,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";
import { SymbolFlags, TypeChecker } from "typescript";

type Context = TSESLint.RuleContext<"noPublicClassFields", []>;

export const noPublicClassFields = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow class types in public class fields",
    },
    messages: {
      noPublicClassFields:
        "Public field '{{ propertyName }}' should not use class type '{{ typeName }}'. Consider using an interface or type alias instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    return {
      ClassDeclaration(node) {
        // NOTE: Check class members
        validateClassMember({
          node,
          context,
          parserServices,
          typeChecker,
        });

        // NOTE: Check constructor parameter properties
        const constructor = node.body.body.find(
          (member): member is TSESTree.MethodDefinition =>
            member.type === "MethodDefinition" && member.kind === "constructor"
        );
        if (!constructor || constructor.value.type !== "FunctionExpression") {
          return;
        }
        validateConstructorParameterProperty({
          constructor,
          context,
          parserServices,
          typeChecker,
        });
      },
    };
  },
});

const validateClassMember = ({
  node,
  context,
  parserServices,
  typeChecker,
}: {
  node: TSESTree.ClassDeclaration;
  context: Context;
  parserServices: ParserServicesWithTypeInformation;
  typeChecker: TypeChecker;
}) => {
  for (const member of node.body.body) {
    if (
      member.type !== "PropertyDefinition" ||
      member.key.type !== "Identifier"
    ) {
      continue;
    }

    // skip private and protected fields
    if (["private", "protected"].includes(member.accessibility ?? "")) {
      continue;
    }

    // skip fields without type annotation
    if (!member.typeAnnotation) {
      continue;
    }

    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(member);
    const type = typeChecker.getTypeAtLocation(tsNode);

    if (!type.symbol) continue;

    const isClass = type.symbol.flags === SymbolFlags.Class;
    if (!isClass) continue;

    context.report({
      node: member,
      messageId: "noPublicClassFields",
      data: {
        propertyName: member.key.name,
        typeName: type.symbol.name,
      },
    });
  }
};

const validateConstructorParameterProperty = ({
  constructor,
  context,
  parserServices,
  typeChecker,
}: {
  constructor: TSESTree.MethodDefinition;
  context: Context;
  parserServices: ParserServicesWithTypeInformation;
  typeChecker: TypeChecker;
}) => {
  for (const param of constructor.value.params) {
    if (
      param.type !== "TSParameterProperty" ||
      param.parameter.type !== "Identifier"
    ) {
      continue;
    }

    // Skip private and protected parameters
    if (["private", "protected"].includes(param.accessibility ?? "")) {
      continue;
    }

    // Skip parameters without type annotation
    if (!param.parameter.typeAnnotation) {
      continue;
    }

    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(param);
    const type = typeChecker.getTypeAtLocation(tsNode);

    if (!type.symbol) continue;

    const isClass = type.symbol.flags === SymbolFlags.Class;
    if (!isClass) continue;

    context.report({
      node: param,
      messageId: "noPublicClassFields",
      data: {
        propertyName: param.parameter.name,
        typeName: type.symbol.name,
      },
    });
  }
};
