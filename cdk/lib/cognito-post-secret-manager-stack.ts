import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CognitoConfig} from "./config/type-desinition";
import * as fs from "fs";
import {Secret} from "aws-cdk-lib/aws-secretsmanager";
import {SecretValue} from "aws-cdk-lib/core";

export class CognitoPostSecretManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CognitoConfig) {
    super(scope, id, props);

    if (props.googleConfig.filename) {
      try {
        const content = fs.readFileSync(props.googleConfig.filename, {
          encoding: "utf-8"
        });
        const json = JSON.parse(content);
        console.log(json["web"]["client_id"]);
        const secretObjectValue: {[key: string]: SecretValue} = {
          "client_id": SecretValue.unsafePlainText(json["web"]["client_id"]),
          "client_secret": SecretValue.unsafePlainText(json["web"]["client_secret"]),
          "content": SecretValue.unsafePlainText(content)
        };

        new Secret(this, 'Secret', {
          secretName: props.googleConfig.name,
          secretObjectValue: secretObjectValue,
        });
      } catch (error: unknown) {
        throw error;
      }
    }
  }
}
