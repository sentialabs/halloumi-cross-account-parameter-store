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
  // get the logical id of the function service role
  const roleId = stack.getLogicalId(
    functionConstruct.functionRole.node.findChild('Resource') as CfnElement
  );

  const template = Template.fromStack(stack);

  test('service role should have sts:AssumeRole action allowed', () => {
    template.hasResourceProperties(
      'AWS::IAM::Role',
      lambdaServiceRoleAssumeRolePolicyDocument
    );
  });

  test('service role should have AWSLambdaBasicExecutionRole policy attached', () => {
    template.hasResourceProperties(
      'AWS::IAM::Role',
      lambdaServiceRoleManagedPolicyArns
    );
  });

  test(`service role should have permission to assume ${targetAccountRoleArn} role in the target account`, () => {
    template.hasResourceProperties(
      'AWS::IAM::Policy',
      getLambdaServiceRoleAssumeRoleAttachedPolicy(targetAccountRoleArn, roleId)
    );
  });

  test(`resource needs to have the service role ${roleId} attached`, () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Role: {
        'Fn::GetAtt': [roleId, 'Arn'],
      },
    });
  });

  test('resource needs to define environment variables', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          ROLE_ARN: targetAccountRoleArn,
        },
      },
    });
  });
});
