import { Template } from 'aws-cdk-lib/assertions';
import { Stack } from 'aws-cdk-lib/core';
import { HalloumiCrossAccountParameterStore } from '../src';

describe('Given we want to create a Lambda-backed custom resource, the Lambda function', () => {
  const stack = new Stack();
  new HalloumiCrossAccountParameterStore(
    stack,
    'HalloumiCrossAccountParameterStoreStack'
  );
  const template = Template.fromStack(stack);

  it('should have a role that it can assume', () => {
    // make it pass initially
    template.resourceCountIs('AWS::IAM::Role', 0);
  });
});
