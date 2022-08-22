import { Match, Template } from 'aws-cdk-lib/assertions';
import { Stack } from 'aws-cdk-lib/core';
import { CustomResourceProvider } from '../src';
import { targetRole1Props, targetRole2Props } from './fixtures';

describe('Given a stack with two CustomResourceProviders, it', () => {
  let stack: Stack;
  let template: Template;

  beforeAll(() => {
    // GIVEN
    stack = new Stack();

    // WHEN
    new CustomResourceProvider(stack, 'CustomResourceProvider1', {
      roleArn: targetRole1Props.arn,
      roleExternalId: targetRole1Props.externalId,
      roleSessionName: targetRole1Props.sessionName,
    });

    new CustomResourceProvider(stack, 'CustomResourceProvider2', {
      roleArn: targetRole2Props.arn,
      roleExternalId: targetRole2Props.externalId,
      roleSessionName: targetRole2Props.sessionName,
    });

    template = Template.fromStack(stack);
  });

  it('needs to create 2 instances of the CustomResourceProvider.', () => {
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

    expect(resourcesCount).toBe(2);
  });

  it('needs to create a FunctionConstruct for each CustomResourceProvider instance', () => {
    const constructFunction1 = template.findResources('AWS::Lambda::Function', {
      Properties: {
        Environment: {
          Variables: {
            ROLE_ARN: targetRole1Props.arn,
            ROLE_EXTERNAL_ID: targetRole1Props.externalId,
            ROLE_SESSION_NAME: targetRole1Props.sessionName,
          },
        },
      },
    });

    const constructFunction2 = template.findResources('AWS::Lambda::Function', {
      Properties: {
        Environment: {
          Variables: {
            ROLE_ARN: targetRole2Props.arn,
            ROLE_EXTERNAL_ID: targetRole2Props.externalId,
            ROLE_SESSION_NAME: targetRole2Props.sessionName,
          },
        },
      },
    });

    const constructFunction1Count = Object.keys(constructFunction1).length;
    const constructFunction2Count = Object.keys(constructFunction2).length;

    expect(constructFunction1Count).toBe(1);
    expect(constructFunction2Count).toBe(1);
  });
});
