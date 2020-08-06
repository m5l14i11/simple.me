#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { MeStack } = require('../lib/me-stack');

const app = new cdk.App();
new MeStack(app, 'MeStack');
