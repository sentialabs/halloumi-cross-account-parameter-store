import { Duration, Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

/** @internal */
export interface FunctionProps {
  /**
   * The ARN of the role on the target account that the STS client on the Lambda function
   * assumes and has permissions to create, update and delete a parameter on that account.
   */
  readonly roleArn: string;
  /**
   * Optional: IAM role session name when STS client on the Lambda function assumes the
   * role on the target account. Default is `halloumi_cross_account_parameter_store`.
   */
  readonly roleSessionName?: string;
  /**
   * Optional: Information that you can use in an IAM role trust policy to designate who
   * can assume the role.
   */
  readonly roleExternalId?: string;
}

/** @internal */
export class FunctionConstruct extends Construct {
  /**
   * The construct scope
   */
  private readonly scope: Construct;
  /**
   * The region in which the parent stack is deployed to
   */
  private readonly region: string;
  /**
   * The instance props
   */
  private readonly props: FunctionProps;
  /**
   * The IAM Role of the function.
   */
  readonly functionRole: iam.IRole;
  /**
   * The Lambda function
   */
  readonly _function: lambda.IFunction;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);
    this.scope = scope;
    this.props = props;
    this.region = Stack.of(this).region;
    this.functionRole = this.createFunctionRole(id);
    this._function = this.createFunction(id);
  }

  private createFunctionRole(id: string): iam.IRole {
    const { roleArn } = this.props;
    const role = new iam.Role(this.scope, `${id}Role`, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    role.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole'],
        effect: iam.Effect.ALLOW,
        resources: [roleArn],
      })
    );

    role.addManagedPolicy(
      iam.ManagedPolicy.fromManagedPolicyName(
        this.scope,
        `${id}ManagedPolicyName`,
        'service-role/AWSLambdaBasicExecutionRole'
      )
    );
    return role;
  }

  private createFunction(id: string): lambda.IFunction {
    const { roleArn, roleExternalId, roleSessionName } = this.props;

    const fn = new lambda.Function(this.scope, `${id}Function`, {
      code: lambda.Code.fromAsset('src/lambdas/cross-account-parameter-store'),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'main.on_event',
      timeout: Duration.seconds(900),
      logRetention: logs.RetentionDays.FIVE_MONTHS,
      role: this.functionRole,
      environment: {
        REGION: this.region,
        ROLE_ARN: roleArn,
        ROLE_EXTERNAL_ID: roleExternalId || '',
        ROLE_SESSION_NAME:
          roleSessionName || 'halloumi_cross_account_parameter_store',
      },
    });

    return fn;
  }
}
