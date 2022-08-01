import { Template } from 'aws-cdk-lib/assertions';
import { Stack } from 'aws-cdk-lib/core';
import { HalloumiCrossAccountParameterStore } from '../src';

describe('Given we want to create a Lambda-backed custom resource, the CloudFormation custom resource', () => {
  const stack = new Stack();
  const targetAccountRoleArn = 'some-role-arn';
  const targetAccountAssumeRoleExternalId = 'some-external-id';
  const targetAccountAssumeRoleSessionName = 'some-session-name';
  const parameterValue = 'some-value';
  const parameterName = '/some/parameter/name';
  const parameterDescription = 'some-description';

  new HalloumiCrossAccountParameterStore(
    stack,
    'HalloumiCrossAccountParameterStoreConstruct',
    {
      parameterName,
      parameterValue,
      parameterDescription,
      roleArn: targetAccountRoleArn,
      roleExternalId: targetAccountAssumeRoleExternalId,
      roleSessionName: targetAccountAssumeRoleSessionName,
    }
  );

  const template = Template.fromStack(stack);

  it('needs to define resource properties', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      PARAMETER_NAME: parameterName,
      PARAMETER_VALUE: parameterValue,
      PARAMETER_DESCRIPTION: parameterDescription,
    });
  });

  test('provider function needs to define environment variables', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          ROLE_ARN: targetAccountRoleArn,
          ROLE_EXTERNAL_ID: targetAccountAssumeRoleExternalId,
          ROLE_SESSION_NAME: targetAccountAssumeRoleSessionName,
        },
      },
    });
  });
});
