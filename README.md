# Halloumi Cross Account Parameter Store

A custom CDK construct to manage a parameter across an AWS account. This construct creates a Lambda-backed custom resource using AWS CloudFormation that handles assuming a role on the target AWS account and puts, updates or deletes a parameter on that account. Role and parameter related variables are passed to the construct and are used by the function to perform these operations.

## Usage

### TypeScript

```typescript
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  HalloumiCrossAccountParameterStore,
  CustomResourceProvider,
} from 'halloumi-cross-account-parameter-store';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const provider = new CustomResourceProvider(
      this,
      'CrossAccountParameterStoreCustomResourceProvider',
      {
        roleArn: 'arn:aws:iam::123412341234:role/role-name',
        roleExternalId: '',
        roleSessionName: '',
      }
    );

    new HalloumiCrossAccountParameterStore(this, 'Parameter1', {
      customResourceProvider: provider,
      parameterName: '/some/parameter/name',
      parameterValue: 'some-value',
      parameterDescription: 'my-description',
    });

    new HalloumiCrossAccountParameterStore(this, 'Parameter2', {
      customResourceProvider: provider,
      parameterName: '/some/parameter/name2',
      parameterValue: 'some-value-2',
      parameterDescription: 'my-description',
    });
  }
}
```

### Python

```python
from aws_cdk import (
    Stack,
)
from halloumi_cross_account_parameter_store import (
    CustomResourceProvider,
    HalloumiCrossAccountParameterStore,
)
from constructs import Construct

class MyStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        provider = CustomResourceProvider(
            self,
            "CrossAccountParameterStoreCustomResourceProvider",
            role_arn="arn:aws:iam::123412341234:role/role-name",
            role_external_id="",
            role_session_name="",
        )

        HalloumiCrossAccountParameterStore(
            self,
            "Parameter1",
            custom_resource_provider=provider,
            parameter_name="/some/parameter/name",
            parameter_value="some-value",
            parameter_description="my-description",
        )
        HalloumiCrossAccountParameterStore(
            self,
            "Parameter2",
            custom_resource_provider=provider,
            parameter_name="/some/parameter/name2",
            parameter_value="some-value",
            parameter_description="my-description",
        )
```

**Note: You only need to define the `CustomResourceProvider` once and pass it to the `HalloumiCrossAccountParameterStore` constructor of your new instance. If you need to assume different roles, create a new instance of the `CustomResourceProvider` and use it accordingly.**

## Setting Up Trust Relationship and the Permissions

The Lambda function role needs to have permission to assume the role in the target account and perform `ssm:PutParameter` and `ssm:DeleteParameter` actions. Here's what you need to do to setup the IAM role on the target account that allows the function role on `111111111111` account to create, update or delete parameters with a prefix of `/halloumi-cross-account/` on `eu-central-1` region. Be sure to adjust the values accordingly.

Trust relationship policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111111111111:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "SET_OR_REMOVE_THE_CONDITION_AND_EXTERNAL_ID_ACCORDINGLY"
        }
      }
    }
  ]
}
```

Policy Document:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPutDeleteParameterWithPrefix",
      "Effect": "Allow",
      "Action": ["ssm:PutParameter", "ssm:DeleteParameter"],
      "Resource": "arn:aws:ssm:eu-central-1:YOUR_SANDBOX_ACCOUNT_ID:parameter/halloumi-cross-account/*"
    }
  ]
}
```

For more information, please check the [API Doc](API.md)
