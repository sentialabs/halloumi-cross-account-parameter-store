import { Template } from 'aws-cdk-lib/assertions';
import { Stack } from 'aws-cdk-lib/core';
import { HalloumiCrossAccountParameterStoreFunction } from '../src/resources/function';

describe('Given we want to create a Lambda-backed custom resource, the Lambda function', () => {
  const stack = new Stack();
  new HalloumiCrossAccountParameterStoreFunction(
    stack,
    'HalloumiCrossAccountParameterStoreFunction',
    {
      roleArn: 'some-role-arn',
    }
  );
  const template = Template.fromStack(stack);

  it('should have a role that it can assume', () => {
    template.resourceCountIs('AWS::IAM::Role', 1);
  });
});
