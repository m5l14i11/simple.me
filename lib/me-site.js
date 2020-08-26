const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const s3deploy = require('@aws-cdk/aws-s3-deployment');
const cloudfront = require('@aws-cdk/aws-cloudfront');
const route53 = require('@aws-cdk/aws-route53');
const acm = require('@aws-cdk/aws-certificatemanager');
const targets = require('@aws-cdk/aws-route53-targets/lib');

class MeSite extends cdk.Construct {
  constructor(parent, name, props) {
      super(parent, name);

      const domainName = props.domainName;
      const siteSubDomain = props.siteSubDomain;

      const hostedZone = route53.HostedZone.fromLookup(this, 'MeZone', { domainName });

      // FIX
      hostedZone.hostedZoneId = 'Z03308721WODLQWVUUQPA';

      const siteDomain = `${siteSubDomain}.${domainName}`;

      new cdk.CfnOutput(this, 'MeSite', { value: `https://${siteDomain}` });

      const siteBucket = new s3.Bucket(this, 'MeSiteBucket', {
        bucketName: siteDomain,
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'error.html',
        publicReadAccess: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      new cdk.CfnOutput(this, 'MeBucket', { value: siteBucket.bucketName });

      const certificate = new acm.DnsValidatedCertificate(this, 'MeSiteCertificate', {
        domainName: siteDomain,
        hostedZone,
        region: 'us-east-1'
      });
      
      new cdk.CfnOutput(this, 'MeCertificate', { value: certificate.certificateArn });

      const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MeSiteDistribution', {
        aliasConfiguration: {
          acmCertRef: certificate.certificateArn,
          names: [ siteDomain ],
          sslMethod: cloudfront.SSLMethod.SNI,
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
        },
        originConfigs: [
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },          
            behaviors : [{isDefaultBehavior: true}],
          }
        ]
      });

      new cdk.CfnOutput(this, 'MeDistributionId', { value: distribution.distributionId });

      new route53.ARecord(this, 'MeSiteAliasRecord', {
        recordName: siteDomain,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        zone: hostedZone
      });

      new s3deploy.BucketDeployment(this, 'MeSiteDeployWithInvalidation', {
        sources: [s3deploy.Source.asset('./dist')],
        destinationBucket: siteBucket,
        distribution,
        distributionPaths: ['/*'],
      });
  }
}

module.exports = { MeSite }
