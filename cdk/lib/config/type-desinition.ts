import {UserPoolProps} from "aws-cdk-lib/aws-cognito";
import {StackProps} from "aws-cdk-lib/core/lib/stack";
import {UserPoolDomainOptions} from "aws-cdk-lib/aws-cognito/lib/user-pool-domain";
import {UserPoolClientOptions} from "aws-cdk-lib/aws-cognito/lib/user-pool-client";

export interface CognitoConfig extends UserPoolProps, StackProps {
    userPoolDomainOptions: UserPoolDomainOptions;
    // userPoolClientOptions: UserPoolClientOptions;
    googleConfig: {
        name: string,
        jsonPath: string,
        filename?: string,
    }
};
