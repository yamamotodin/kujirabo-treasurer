#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CognitoStack} from "../lib/cognito-stack";
import {DevelopConfig} from "../lib/config";
import {CognitoPostSecretManagerStack} from "../lib/cognito-post-secret-manager-stack";
import * as fs from "fs";

const app = new cdk.App();

new CognitoStack(app, 'CognitoStack', DevelopConfig.cognitoConfig);
if (DevelopConfig.cognitoConfig.googleConfig.filename
    && fs.existsSync(DevelopConfig.cognitoConfig.googleConfig.filename)) {
    new CognitoPostSecretManagerStack(app, 'CognitoPostSecretManagerStack', DevelopConfig.cognitoConfig);
}
