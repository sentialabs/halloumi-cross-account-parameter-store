import {
  Role,
  ServicePrincipal,
  Effect,
  PolicyStatement,
  ManagedPolicy,
} from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

//#region interfaces
export interface FunctionProps {
  /**
   * The ARN of the role on the target account that the STS client on the Lambda function
   * assumes and has permissions to create, update and delete a parameter on that account.
   */
  readonly roleArn: string;
  /**
   * Optional. IAM role session name when STS client on the Lambda function assumes the
   * role on the target account.
   * @default halloumi_cross_account_parameter_store
   */
  readonly roleSessionName?: string;
  /**
   * Optional. Information that you can use in an IAM role trust policy to designate who
   * can assume the role.
   * @default undefined
   */
  readonly roleExternalId?: string;
}
//#endregion

export class HalloumiCrossAccountParameterStoreFunction extends Construct {
  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);

    const { roleArn } = props;

    const role = new Role(scope, `${id}Role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    role.addToPrincipalPolicy(
      new PolicyStatement({
        actions: ['sts:AssumeRole'],
        effect: Effect.ALLOW,
        resources: [roleArn],
      })
    );
    role.addManagedPolicy(
      ManagedPolicy.fromManagedPolicyName(
        scope,
        `${id}ManagedPolicyName`,
        'service-role/AWSLambdaBasicExecutionRole'
      )
    );
  }
}
