import { Construct, CfnOutput } from "@aws-cdk/core";
import { Function, Runtime, Code, Version } from "@aws-cdk/aws-lambda";
import { Duration, RemovalPolicy } from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { 
  OriginAccessIdentity, CloudFrontWebDistribution,
  HttpVersion, SSLMethod, SecurityPolicyProtocol,
  LambdaEdgeEventType
} from "@aws-cdk/aws-cloudfront";
import {
  BucketDeployment,
  Source
} from "@aws-cdk/aws-s3-deployment";
import { ARecord, RecordTarget, HostedZone } from "@aws-cdk/aws-route53";
import { DnsValidatedCertificate } from "@aws-cdk/aws-certificatemanager";
import * as targets from "@aws-cdk/aws-route53-targets/lib";

class MeSite extends Construct {
  constructor(
    parent: Construct,
    name: string,
    props: { siteSubDomain: string; domainName: string }
  ) {
    super(parent, name);

    const { siteSubDomain, domainName } = props;

    const hostedZone = HostedZone.fromHostedZoneAttributes(
      this,
      "MeZone",
      {
        hostedZoneId: "Z03308721WODLQWVUUQPA",
        zoneName: domainName,
      }
    );

    const siteDomain = `${siteSubDomain}.${domainName}`;

    const siteBucket = new Bucket(this, "MeSiteBucket", {
      bucketName: siteDomain,
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      "MeOAI"
    );

    siteBucket.grantRead(originAccessIdentity);

    const certificate = new DnsValidatedCertificate(
      this,
      "MeSiteCertificate",
      {
        domainName: siteDomain,
        hostedZone,
      }
    );

    const edgeSSRFunction = new Function(this, "MeEdgeSSRHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("./edge"),
      memorySize: 128,
      timeout: Duration.seconds(3),
      handler: "index.handler",
    });

    const edgeSSRFunctionVersion = new Version(
      this,
      "MeEdgeSSRHandlerVersion",
      {
        lambda: edgeSSRFunction,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    const distribution = new CloudFrontWebDistribution(
      this,
      "MeSiteDistribution",
      {
        enableIpV6: true,
        httpVersion: HttpVersion.HTTP2,

        aliasConfiguration: {
          acmCertRef: certificate.certificateArn,
          names: [siteDomain],
          sslMethod: SSLMethod.SNI,
          securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
        },

        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
              originAccessIdentity: originAccessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                pathPattern: "/",
                lambdaFunctionAssociations: [
                  {
                    eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
                    lambdaFunction: edgeSSRFunctionVersion,
                  },
                ],
              },
            ],
          },
        ],
      }
    );

    new ARecord(this, "MeSiteAliasRecord", {
      recordName: siteDomain,
      zone: hostedZone,
      target: RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    new BucketDeployment(this, "MeSiteDeployWithInvalidation", {
      sources: [Source.asset("./static")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new BucketDeployment(this, "MeDataDeployWithInvalidation", {
      sources: [Source.asset("./data")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "MeSite", {
      value: `https://${siteDomain}`,
    });

    new CfnOutput(this, "MeBucket", {
      value: siteBucket.bucketName,
    });

    new CfnOutput(this, "MeCertificate", {
      value: certificate.certificateArn,
    });

    new CfnOutput(this, "MeDistributionId", {
      value: distribution.distributionId,
    });
  }
}

export { MeSite };
