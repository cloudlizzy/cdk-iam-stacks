import { App } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { GithubActionsStack, GitHubActionsStackProps } from './stacks/GitHubActionsStack';

if (iam) {
}


// for development, use account/region from cdk cli
const props: GitHubActionsStackProps = {
  orgName: process.env.ORG_NAME as string,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT as string,
    region: process.env.CDK_DEFAULT_REGION as string,
  },
};

const app = new App();

new GithubActionsStack(app, 'GitHubActionsRole', props);
// new MyStack(app, 'cdk-iam-stacks-prod', { env: prodEnv });

app.synth();