import { Template } from 'aws-cdk-lib/assertions';
import { Stack, CfnElement } from 'aws-cdk-lib/core';
import { FunctionConstruct } from '../src/resources/function';
import {
  lambdaServiceRoleAssumeRoleAttachedPolicy as getLambdaServiceRoleAssumeRoleAttachedPolicy,
  lambdaServiceRoleAssumeRolePolicyDocument,
  lambdaServiceRoleManagedPolicyArns,
} from './fixtures';

describe('Given we want to create a Lambda-backed custom resource, the Lambda function', () => {
  let stack: Stack;
  let template: Template;
  let roleId: string;
  const targetAccountRoleArn = 'some-role-arn';

  beforeAll(() => {
    // GIVEN
    stack = new Stack();

    // WHEN
    const functionConstruct = new FunctionConstruct(
      stack,
      'HalloumiCrossAccountParameterStoreFunction',
      {
        roleArn: targetAccountRoleArn,
      }
    );
    // get the logical id of the function service role
    roleId = stack.getLogicalId(
      functionConstruct.gFunctionRole().node.findChild('Resource') as CfnElement
    );
    template = Template.fromStack(stack);
  });

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

  test(`resource needs to have the service role with proper permissions attached`, () => {
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

  test('resource needs to define runtime and handler properties', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'python3.8',
      Handler: 'main.on_event',
    });
  });
});
