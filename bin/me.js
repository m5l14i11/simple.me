#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { MeSite } = require('../lib/me-site');

class MeStack extends cdk.Stack {
    constructor(parent, name, props) {
        super(parent, name, props);

        new MeSite(this, 'MeSite', {
            domainName: this.node.tryGetContext('domain'),
            siteSubDomain: this.node.tryGetContext('subdomain'),
        });
   }
}

const app = new cdk.App();

new MeStack(app, 'MeStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION
    }
});

app.synth();