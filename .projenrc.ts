const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Sentia MPC',
  authorAddress: 'support.mpc@sentia.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  name: 'halloumi-cross-account-parameter-store',
  repositoryUrl:
    'https://github.com/sentialabs/halloumi-cross-account-parameter-store.git',

  deps: ['aws-sdk'],
  description:
    'A custom CDK construct to manage a parameter across an AWS account. This construct creates a Lambda-backed custom resource using AWS CloudFormation that handles assuming a role on the target AWS account and puts, updates or deletes a parameter on that account. Role and parameter related variables are passed to the construct and are used by the function to perform these operations.',
  devDeps: ['@types/cfn-response', '@aws-cdk/assert@^2.1'],
  bundledDeps: ['aws-sdk'],
  eslintOptions: { prettier: true },
  publishToPypi: {
    distName: 'halloumi-cross-account-parameter-store',
    module: 'halloumi_cross_account_parameter_store',
  },
  antitamper: false,
});

project.package.addField('prettier', {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
});

project.eslint.addRules({
  'prettier/prettier': [
    'error',
    { singleQuote: true, semi: true, trailingComma: 'es5' },
  ],
});

project.synth();
