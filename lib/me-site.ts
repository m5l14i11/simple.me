import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as route53 from "@aws-cdk/aws-route53";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as targets from "@aws-cdk/aws-route53-targets/lib";

class MeSite extends cdk.Construct {
  constructor(parent: cdk.Construct, name: string, props: { siteSubDomain: string; domainName: string; }) {
    super(parent, name);

    const { siteSubDomain, domainName } = props;

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, "MeZone", {
      hostedZoneId: 'Z03308721WODLQWVUUQPA',
      zoneName: domainName
    });
    
    const siteDomain = `${siteSubDomain}.${domainName}`;

    new cdk.CfnOutput(this, "MeSite", { value: `https://${siteDomain}` });

    const siteBucket = new s3.Bucket(this, "MeSiteBucket", {
      bucketName: siteDomain,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new cdk.CfnOutput(this, "MeBucket", { value: siteBucket.bucketName });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "me-oia");

    siteBucket.grantRead(originAccessIdentity);

    const certificate = new acm.DnsValidatedCertificate(
      this,
      "MeSiteCertificate",
      {
        domainName: siteDomain,
        hostedZone
      }
    );

    new cdk.CfnOutput(this, "MeCertificate", {
      value: certificate.certificateArn,
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "MeSiteDistribution",
      {
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
              originAccessIdentity: originAccessIdentity
            },
            behaviors: [{ isDefaultBehavior: true }]
          },
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ pathPattern: '/', compress: true }],
          },
        ],
        httpVersion: cloudfront.HttpVersion.HTTP2,
      }
    );

    new cdk.CfnOutput(this, "MeDistributionId", {
      value: distribution.distributionId,
    });

    new route53.ARecord(this, "MeSiteAliasRecord", {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
      zone: hostedZone,
    });

    new s3deploy.BucketDeployment(this, "MeSiteDeployWithInvalidation", {
      sources: [s3deploy.Source.asset("./dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}

export { MeSite };
