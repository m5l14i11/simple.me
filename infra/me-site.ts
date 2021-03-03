import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as route53 from "@aws-cdk/aws-route53";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as targets from "@aws-cdk/aws-route53-targets/lib";
import * as lambda from "@aws-cdk/aws-lambda";
import { Duration, RemovalPolicy } from "@aws-cdk/core";

class MeSite extends cdk.Construct {
  constructor(
    parent: cdk.Construct,
    name: string,
    props: { siteSubDomain: string; domainName: string }
  ) {
    super(parent, name);

    const { siteSubDomain, domainName } = props;

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "MeZone",
      {
        hostedZoneId: "Z03308721WODLQWVUUQPA",
        zoneName: domainName,
      }
    );

    const siteDomain = `${siteSubDomain}.${domainName}`;

    const siteBucket = new s3.Bucket(this, "MeSiteBucket", {
      bucketName: siteDomain,
      websiteIndexDocument: "index.html",
      publicReadAccess: false,

      removalPolicy: RemovalPolicy.RETAIN,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "MeOAI"
    );

    siteBucket.grantRead(originAccessIdentity);

    const certificate = new acm.DnsValidatedCertificate(
      this,
      "MeSiteCertificate",
      {
        domainName: siteDomain,
        hostedZone,
      }
    );

    const edgeSSRFunction = new lambda.Function(this, "MeEdgeSSRHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./edge"),
      memorySize: 128,
      timeout: Duration.seconds(3),
      handler: "index.handler",
    });

    const edgeSSRFunctionVersion = new lambda.Version(
      this,
      "MeEdgeSSRHandlerVersion",
      {
        lambda: edgeSSRFunction,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "MeSiteDistribution",
      {
        enableIpV6: true,
        httpVersion: cloudfront.HttpVersion.HTTP2,

        aliasConfiguration: {
          acmCertRef: certificate.certificateArn,
          names: [siteDomain],
          sslMethod: cloudfront.SSLMethod.SNI,
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
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
                    eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
                    lambdaFunction: edgeSSRFunctionVersion,
                  },
                ],
              },
            ],
          },
        ],
      }
    );

    new route53.ARecord(this, "MeSiteAliasRecord", {
      recordName: siteDomain,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    new s3deploy.BucketDeployment(this, "MeSiteDeployWithInvalidation", {
      sources: [s3deploy.Source.asset("./static")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "MeSite", {
      value: `https://${siteDomain}`,
    });

    new cdk.CfnOutput(this, "MeBucket", {
      value: siteBucket.bucketName,
    });

    new cdk.CfnOutput(this, "MeCertificate", {
      value: certificate.certificateArn,
    });

    new cdk.CfnOutput(this, "MeDistributionId", {
      value: distribution.distributionId,
    });
  }
}

export { MeSite };
