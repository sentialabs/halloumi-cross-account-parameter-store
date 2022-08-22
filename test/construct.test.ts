import { Template, Match } from 'aws-cdk-lib/assertions';
import { Stack } from 'aws-cdk-lib/core';
import {
  HalloumiCrossAccountParameterStore,
  CustomResourceProvider,
} from '../src';
import { targetRole1Props, param1, param2 } from './fixtures';

describe('Given we want to create a Lambda-backed custom resource, the CloudFormation custom resource', () => {
  let stack: Stack;
  let template: Template;
  const {
    arn: roleArn,
    externalId: roleExternalId,
    sessionName: roleSessionName,
  } = targetRole1Props;

  beforeAll(() => {
    // GIVEN;
    stack = new Stack();

    // WHEN
    const provider = new CustomResourceProvider(
      stack,
      'CrossAccountParameterStoreCustomResourceProvider',
      {
        roleArn,
        roleExternalId,
        roleSessionName,
      }
    );

    new HalloumiCrossAccountParameterStore(stack, 'Parameter1', {
      customResourceProvider: provider,
      parameterName: param1.name,
      parameterValue: param1.value,
      parameterDescription: param1.description,
    });

    new HalloumiCrossAccountParameterStore(stack, 'Parameter2', {
      customResourceProvider: provider,
      parameterName: param2.name,
      parameterValue: param2.value,
      parameterDescription: param2.description,
    });

    template = Template.fromStack(stack);
  });

  it('needs to define resource properties for Parameter1', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      PARAMETER_NAME: param1.name,
      PARAMETER_VALUE: param1.value,
      PARAMETER_DESCRIPTION: param1.description,
    });
  });

  it('needs to define resource properties for Parameter2', () => {
    template.hasResourceProperties('AWS::CloudFormation::CustomResource', {
      PARAMETER_NAME: param2.name,
      PARAMETER_VALUE: param2.value,
      PARAMETER_DESCRIPTION: param2.description,
    });
  });

  test('provider function needs to define environment variables', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          ROLE_ARN: roleArn,
          ROLE_EXTERNAL_ID: roleExternalId,
          ROLE_SESSION_NAME: roleSessionName,
        },
      },
    });
  });

  test('provider framework needs to reuse the underlying function for every custom resource. The function should be created only once.', () => {
    const resources = template.findResources('AWS::Lambda::Function', {
      Properties: {
        Environment: {
          Variables: {
            ROLE_ARN: roleArn,
            ROLE_EXTERNAL_ID: roleExternalId,
            ROLE_SESSION_NAME: roleSessionName,
          },
        },
      },
    });

    const resourcesCount = Object.keys(resources).length;

    expect(resourcesCount).toBe(1);
  });

  test('provider framework function should be created only once.', () => {
    const resources = template.findResources('AWS::Lambda::Function', {
      Properties: {
        Description: Match.stringLikeRegexp(
          'AWS CDK resource provider framework - onEvent *'
        ),
        Handler: 'framework.onEvent',
        Runtime: 'nodejs14.x',
      },
    });

    const resourcesCount = Object.keys(resources).length;

    expect(resourcesCount).toBe(1);
  });
});
