import { Effect, PolicyDocument, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export const GitHubActionsInlinePolicy = {
  PowerUserConstraints: new PolicyDocument({
    statements: [
      new PolicyStatement({
        sid: 'DefinitelyNotThese',
        actions: [
          'iam:PutGroupPolicy',
          'iam:PutUserPolicy',
          'iam:AddClientIDToOpenIDConnectProvider',
          'iam:AddUserToGroup',
          'iam:AttachUserPolicy',
          'iam:CreateLoginProfile',
          'iam:CreateSAMLProvider',
          'iam:CreateUser',
          'iam:CreateVirtualMFADevice',
          'iam:DeleteAccountAlias',
          'iam:DeleteAccountPasswordPolicy',
          'iam:DeleteSAMLProvider',
          'iam:RemoveClientIDFromOpenIDConnectProvider',
          'iam:UpdateAccountPasswordPolicy',
          'iam:UpdateOpenIDConnectProviderThumbprint',
          'iam:UpdateSAMLProvider',
        ],
        resources: ['*'],
        effect: Effect.DENY,
      }),
      new PolicyStatement({
        sid: 'AllowThisEveryWhere',
        actions: [
          'iam:Get*',
          'iam:List*',
          'iam:GenerateCredentialReport',
          'iam:SimulateCustomPolicy',
          'iam:SimulatePrincipalPolicy',
        ],
        resources: ['*'],
        effect: Effect.ALLOW,
      }),
      new PolicyStatement({
        sid: 'DenyOrgAccountsAccess',
        effect: Effect.DENY,
        resources: ['*'],
        actions: [
          'organizations:*',
          'account:*',
        ],
      }),
    ],
  }),
};