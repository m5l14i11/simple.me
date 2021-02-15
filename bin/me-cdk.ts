#!/usr/bin/env node

import * as cdk from "@aws-cdk/core";
import { MeSite } from "../lib/me-site";

class MeStack extends cdk.Stack {
  constructor(parent: cdk.Construct, name: string, props: cdk.StackProps) {
    super(parent, name, props);

    new MeSite(this, "MeSite", {
      domainName: this.node.tryGetContext("domain"),
      siteSubDomain: this.node.tryGetContext("subdomain"),
    });
  }
}
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
new MeStack(app, "MeStack", { env });

app.synth();
