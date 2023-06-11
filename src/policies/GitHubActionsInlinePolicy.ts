import { PolicyDocument } from 'aws-cdk-lib/aws-iam';
import * as floyd from 'cdk-iam-floyd';

if (floyd) {
}

export const GitHubActionsInlinePolicy = {
  PowerUserConstraints: new PolicyDocument({
    statements: [
      new floyd.Iam().deny().onAllResources()
        .toPutGroupPolicy()
        .toPutUserPolicy()
        .toAddClientIDToOpenIDConnectProvider()
        .toAddUserToGroup()
        .toAttachUserPolicy()
        .toCreateLoginProfile()
        .toCreateSAMLProvider()
        .toCreateUser()
        .toCreateVirtualMFADevice()
        .toDeleteAccountAlias()
        .toDeleteAccountPasswordPolicy()
        .toDeleteSAMLProvider()
        .toRemoveClientIDFromOpenIDConnectProvider()
        .toUpdateAccountPasswordPolicy()
        .toUpdateOpenIDConnectProviderThumbprint()
        .toUpdateSAMLProvider()
      ,
      new floyd.Iam({
        actions: [
          'iam:Get*',
          'iam:List*',
        ],
      }).allow().onAllResources().toGenerateCredentialReport()
        .toSimulateCustomPolicy()
        .toSimulatePrincipalPolicy()
      ,
      new floyd.Organizations({
        actions: [
          'organizations:*',
          'account:*',
        ],
      }).deny().onAllResources(),
    ],
  }),
};