import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { GitHubActionsInlinePolicy } from '../policies/GitHubActionsInlinePolicy';

export interface GitHubActionsStackProps extends StackProps {
// Define construct properties here
  /** The name of the GitHub organization */
  orgName: string;
  env: {
    account: string;
    region: string;
  };
}

export class GithubActionsStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubActionsStackProps) {
    super(scope, id, props);

    // define resources here...
    const role = new iam.Role(this, 'GitHubActionsRole', {
      description: 'GitHub Actions Role',
      path: '/',
      assumedBy: new iam.CompositePrincipal(new iam.FederatedPrincipal(`arn:aws:iam::${props.env?.account}:oidc-provider/token.actions.githubusercontent.com`, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': `repo:${props.orgName}/*:*`,
        },
      }, 'sts:AssumeRoleWithWebIdentity')),
      roleName: 'GitHubActions',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
      inlinePolicies: GitHubActionsInlinePolicy,
      maxSessionDuration: Duration.hours(12),
    });

    new iam.OpenIdConnectProvider(this, 'Provider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com', `https://github.com/${props.orgName}`],
    });

    if (role) {
    }

  }
}