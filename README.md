# Halloumi Cross Account Parameter Store

A custom CDK construct to manage a parameter across an AWS account. This construct creates a Lambda-backed custom resource using AWS CloudFormation that handles assuming a role on the target AWS account and puts, updates or deletes a parameter on that account. Role and parameter related variables are passed to the construct and are used by the function to perform these operations.

## Usage

```typescript
import * as cdk from '@aws-cdk/core';
import { HalloumiCrossAccountParameterStoreConstruct } from 'halloumi-cross-account-parameter-store';

export class SomeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new HalloumiCrossAccountParameterStore(scope, 'MyCrossAccountParameter1', {
      parameterName: 'some/parameter/name',
      parameterValue: 'some-value',
      roleArn: 'arn:aws:iam::123412341234:role/role-name',
      roleExternalId: '',
      roleSessionName: '',
    });
  }
}
```

For more information, please check the [API Doc](API.md)
