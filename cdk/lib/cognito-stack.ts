import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {ProviderAttribute, UserPool, UserPoolIdentityProviderGoogle} from "aws-cdk-lib/aws-cognito";
import {CognitoConfig} from "./config/type-desinition";
import {SecretValue} from "aws-cdk-lib/core";

export class CognitoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CognitoConfig) {
        super(scope, id, props);
        const userPool = new UserPool(this, "Cognito-UserPool", props);
        userPool.addDomain("Cognito-UserPool-domain", props.userPoolDomainOptions);
        new UserPoolIdentityProviderGoogle(this, "Google", {
            userPool,
            clientId: SecretValue.secretsManager(props.googleConfig.name, {
                jsonField: "client_id"
            }).unsafeUnwrap(),
            // clientSecret: props.googleConfig.secret,
            clientSecretValue: SecretValue.secretsManager(props.googleConfig.name, {
                jsonField: "client_secret"
            }),

            // Email scope is required, because the default is 'profile' and that doesn't allow Cognito
            // to fetch the user's email from his Google account after the user does an SSO with Google
            scopes: ["email"],

            // Map fields from the user's Google profile to Cognito user fields, when the user is auto-provisioned
            attributeMapping: {
                email: ProviderAttribute.GOOGLE_EMAIL,
            },
        });
    }
}
