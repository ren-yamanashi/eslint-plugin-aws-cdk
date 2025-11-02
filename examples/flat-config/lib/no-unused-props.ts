/* eslint-disable awscdk/require-props-default-doc */
/* eslint-disable awscdk/require-jsdoc */
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  ApplicationListener,
  ApplicationProtocol,
  IApplicationLoadBalancer,
  ListenerAction,
  SslPolicy,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {
  AaaaRecord,
  ARecord,
  IHostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { LoadBalancerTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning?: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ All props properties are used
    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning ?? false,
    });
  }
}

interface _MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
  readonly unusedProp: string; // ❌ This property is never used
}

export class _MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: _MyConstructProps) {
    super(scope, id);

    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning,
    });
  }
}

export interface BaseListenerProps {
  readonly alb: IApplicationLoadBalancer;
}

export abstract class BaseListener extends Construct {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(scope: Construct, id: string, props: BaseListenerProps) {
    super(scope, id);
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HttpListenerProps extends BaseListenerProps {}

/**
 * ALBのHttpリスナーを作成する
 *
 * ドメインの付け替えを行う場合など、一時的にカスタムドメイン設定を行いたくない場合以外は利用しないこと
 *
 * 基本的にはHttpsListenerを利用してHttps通信を行うことを推奨
 */
export class HttpListener extends BaseListener {
  constructor(scope: Construct, id: string, props: HttpListenerProps) {
    super(scope, id, props);
  }

  protected createListener(
    props: HttpListenerProps,
    defaultAction: ListenerAction
  ): ApplicationListener {
    // NOTE: L2のApplicationLoadBalancerのscopeで呼び出されるため、id=Resourceは利用できないので注意
    return props.alb.addListener("Listener", {
      port: 80,
      protocol: ApplicationProtocol.HTTP,
      defaultAction,
    });
  }

  protected getHostHeader(props: HttpListenerProps): string {
    return props.alb.loadBalancerDnsName;
  }
}

export interface HttpsListenerProps extends BaseListenerProps {
  readonly domain: string;
  readonly subDomain: string;
  readonly hostedZone: IHostedZone;
  readonly certificate: ICertificate;
}

/**
 * ALBのHttpsリスナーを作成する
 *
 * 基本的にはHttpsでのアクセスを想定しているため、Httpリスナーではなくこちらを利用すること
 */
export class HttpsListener extends Construct {
  constructor(scope: Construct, id: string, props: HttpsListenerProps) {
    super(scope, id);

    new ARecord(this, "ARecord", {
      zone: props.hostedZone,
      recordName: `${props.subDomain}.${props.domain}.`,
      target: RecordTarget.fromAlias(new LoadBalancerTarget(props.alb)),
    });
    new AaaaRecord(this, "AaaaRecord", {
      zone: props.hostedZone,
      recordName: `${props.subDomain}.${props.domain}.`,
      target: RecordTarget.fromAlias(new LoadBalancerTarget(props.alb)),
    });
  }

  protected createListener(
    props: HttpsListenerProps,
    defaultAction: ListenerAction
  ): ApplicationListener {
    // NOTE: L2のApplicationLoadBalancerのscopeで呼び出されるため、id=Resourceは利用できないので注意
    return props.alb.addListener("Listener", {
      port: 443,
      protocol: ApplicationProtocol.HTTPS,
      sslPolicy: SslPolicy.RECOMMENDED_TLS,
      certificates: [props.certificate],
      defaultAction,
    });
  }

  protected getHostHeader(props: HttpsListenerProps): string {
    return `${props.subDomain}.${props.domain}`;
  }
}