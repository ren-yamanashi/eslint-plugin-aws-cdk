import { Type } from "typescript";

import { isResourceType } from "./typecheck/cdk";
import {
  checkHeritageClauseIsImplements,
  isClassDeclaration,
  isIdentifier,
  isPropertyAccessExpression,
} from "./typecheck/ts-node";
import { isClassType } from "./typecheck/ts-type";

/**
 * Checks if the type is an AWS resource Construct that implements a read-only resource interface
 *
 * This function validates that:
 * 1. The type extends from Resource (AWS CDK resource)
 * 2. The type implements an interface following CDK's read-only interface naming convention
 *    - Pattern 1: Class name with I prefix (e.g., Bucket -> IBucket)
 *    - Pattern 2: Class name without Base suffix/prefix with I prefix (e.g., BucketBase -> IBucket, BaseService -> IService)
 *
 * @param type - The TypeScript type to check
 * @returns true if the type is a resource Construct with a matching read-only interface, false otherwise
 *
 * @example
 * // Returns true for:
 * class Bucket extends Resource implements IBucket { ... }
 * class BucketBase extends Resource implements IBucket { ... }
 * class BaseService extends Resource implements IService { ... }
 *
 * // Returns false for:
 * class CustomResource extends Resource { ... } // No matching interface
 * class EdgeFunction extends Resource implements IVersion { ... } // Interface doesn't match naming pattern
 */
export const isResourceWithReadonlyInterface = (type: Type): boolean => {
  if (!isResourceType(type) || !type.symbol?.name) return false;

  const className = type.symbol.name;
  if (className === "Resource" || className === "Construct") return false;

  const implementedInterfaces = getImplementedInterfaceNames(type);

  // Check if any implemented interface matches the class name pattern
  return implementedInterfaces.some((interfaceName) => {
    // Extract the simple interface name (remove namespace if present)
    const simpleInterfaceName = interfaceName.includes(".")
      ? interfaceName.split(".").pop() ?? interfaceName
      : interfaceName;

    // Pattern 1: Class name with I prefix (e.g., Bucket -> IBucket, FargateService -> IFargateService)
    if (simpleInterfaceName === `I${className}`) return true;

    // Pattern 2: Class name without `Base` suffix / prefix with the `I` prefix (e.g., BucketBase -> IBucket, BaseService -> IService)
    const classNameWithoutBase = className.replace(/^Base|Base$/g, "");
    if (simpleInterfaceName === `I${classNameWithoutBase}`) return true;

    return false;
  });
};

/**
 * Retrieves all interface names implemented by a type, including those inherited from base classes
 *
 * This function recursively collects interfaces from:
 * - Direct implements clauses on the class
 * - Implements clauses on all base classes in the inheritance chain
 * - Both simple interface names (e.g., IBucket) and namespace-qualified names (e.g., ecs.IFargateService)
 *
 * @param type - The TypeScript type to analyze
 * @returns Array of interface names (may include namespace prefixes)
 * @private
 */
const getImplementedInterfaceNames = (type: Type): string[] => {
  const interfaces = new Set<string>();
  const processedTypes = new Set<string>();

  const collectInterfaces = (currentType: Type): void => {
    const symbol = currentType.getSymbol?.() ?? currentType.symbol;
    if (!symbol?.name) return;

    if (processedTypes.has(symbol.name)) return;
    processedTypes.add(symbol.name);

    const declarations = symbol.getDeclarations
      ? symbol.getDeclarations()
      : symbol.declarations;
    if (!declarations?.length) return;

    declarations.forEach((declaration) => {
      if (!isClassDeclaration(declaration) || !declaration.heritageClauses) {
        return;
      }

      declaration.heritageClauses.forEach((hc) => {
        if (!checkHeritageClauseIsImplements(hc)) return;

        hc.types.forEach((typeNode) => {
          if (typeNode.expression) {
            if (isIdentifier(typeNode.expression)) {
              // Simple interface name (e.g., IFargateService)
              interfaces.add(typeNode.expression.text);
            } else if (isPropertyAccessExpression(typeNode.expression)) {
              // Namespace qualified interface name (e.g., ecs.IFargateService)
              const namespace = typeNode.expression.expression;
              const interfaceName = typeNode.expression.name;
              if (isIdentifier(namespace) && isIdentifier(interfaceName)) {
                interfaces.add(`${namespace.text}.${interfaceName.text}`);
              }
            }
          }
        });
      });
    });

    const baseTypes = currentType.getBaseTypes?.() ?? [];
    baseTypes.forEach((baseType) => {
      if (isClassType(baseType)) collectInterfaces(baseType);
    });
  };

  collectInterfaces(type);
  return Array.from(interfaces);
};
