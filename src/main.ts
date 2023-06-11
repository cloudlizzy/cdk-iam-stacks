import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class IamStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const props: StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

const app = new App();

new IamStack(app, 'IamStack', props);
// new MyStack(app, 'cdk-iam-stacks-prod', { env: prodEnv });

app.synth();