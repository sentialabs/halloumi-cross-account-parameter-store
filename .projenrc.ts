import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Sentia MPC',
  majorVersion: 1,
  authorAddress: 'support.mpc@sentia.com',
  cdkVersion: '2.37.1',
  defaultReleaseBranch: 'main',
  projenrcTs: true,
  name: 'halloumi-cross-account-parameter-store',
  repositoryUrl:
    'https://github.com/sentialabs/halloumi-cross-account-parameter-store.git',

  description:
    'A custom CDK construct to manage a parameter across an AWS account. This construct creates a Lambda-backed custom resource using AWS CloudFormation that handles assuming a role on the target AWS account and puts, updates or deletes a parameter on that account. Role and parameter related variables are passed to the construct and are used by the function to perform these operations.',
  eslintOptions: { prettier: true, dirs: ['src', 'test'] },
  publishToPypi: {
    distName: 'halloumi-cross-account-parameter-store',
    module: 'halloumi_cross_account_parameter_store',
  },
  gitignore: ['.DS_Store'],
});

project.package.addField('prettier', {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
});

project.eslint?.addRules({
  'prettier/prettier': [
    'error',
    { singleQuote: true, semi: true, trailingComma: 'es5' },
  ],
});

// This task copies the lambda function source code to the output/bundle directory so that the
// source code is available when the library is installed.
project.compileTask.exec('cp -r src/lambdas lib/lambdas');

project.synth();
