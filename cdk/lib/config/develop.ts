import {CognitoConfig} from "./type-desinition";
import {UserPoolClientIdentityProvider} from "aws-cdk-lib/aws-cognito";

const cognitoConfig: CognitoConfig = {
    userPoolName: "kujirabo-treasure-cognito-userpool-dev",
    userPoolDomainOptions: {
        cognitoDomain: {
            domainPrefix: "kujirabo-treasure-dev"
        }
    },
    googleConfig: {
        name: "kujirabo-treasure-dev-google-credential",
        jsonPath: "client_secret",
        filename: "lib/config/client_secret_892617074079-shnc347hjbaq57kmggjd896bpsaco4e2.apps.googleusercontent.com.json"
    }
};

export = {
    cognitoConfig
};
