import { Template } from 'aws-cdk-lib/assertions';
import { Stack, CfnElement } from 'aws-cdk-lib/core';
import { HalloumiCrossAccountParameterStoreFunction } from '../src/resources/function';
import {
  lambdaServiceRoleAssumeRoleAttachedPolicy as getLambdaServiceRoleAssumeRoleAttachedPolicy,
  lambdaServiceRoleAssumeRolePolicyDocument,
  lambdaServiceRoleManagedPolicyArns,
} from './fixtures';

describe('Given we want to create a Lambda-backed custom resource, the Lambda function', () => {
  const stack = new Stack();
  const targetAccountRoleArn = 'some-role-arn';

  const functionConstruct = new HalloumiCrossAccountParameterStoreFunction(
    stack,
    'HalloumiCrossAccountParameterStoreFunction',
    {
      roleArn: targetAccountRoleArn,
    }
  );
  const template = Template.fromStack(stack);

  it('should have a role that it can assume', () => {
    template.resourceCountIs('AWS::IAM::Role', 1);
  });

  it('service role should have sts:AssumeRole action allowed', () => {
    template.hasResourceProperties(
      'AWS::IAM::Role',
      lambdaServiceRoleAssumeRolePolicyDocument
    );
  });

  it('service role should have AWSLambdaBasicExecutionRole policy attached', () => {
    template.hasResourceProperties(
      'AWS::IAM::Role',
      lambdaServiceRoleManagedPolicyArns
    );
  });

  it(`service role should have permission to assume ${targetAccountRoleArn} role in the target account`, () => {
    // get the logical id of the function service role
    const roleId = stack.getLogicalId(
      functionConstruct.functionRole.node.findChild('Resource') as CfnElement
    );
    template.hasResourceProperties(
      'AWS::IAM::Policy',
      getLambdaServiceRoleAssumeRoleAttachedPolicy(targetAccountRoleArn, roleId)
    );
  });
});
