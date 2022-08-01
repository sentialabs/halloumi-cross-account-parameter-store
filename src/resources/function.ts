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
   * The function code from a local directory.
   */
  private readonly functionCode: lambda.AssetCode;
  /**
   * The name of the method within your code that Lambda calls to execute your
   * function.Default is set to `main.on_event`
   */
  private readonly handler: string;
  /**
   * The runtime environment for the Lambda function that you are uploading.
   * Default is set to `Runtime.PYTHON_3_8`
   */
  private readonly runtime: lambda.Runtime;
  /**
   * The IAM Role of the function.
   */
  private readonly functionRole: iam.IRole;
  /**
   * The Lambda function
   */
  private readonly _function: lambda.IFunction;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);

    const functionCodePath = 'src/lambdas/cross-account-parameter-store';
    this.scope = scope;
    this.props = props;
    this.handler = 'main.on_event';
    this.region = Stack.of(this).region;
    this.runtime = lambda.Runtime.PYTHON_3_8;
    this.functionRole = this.createFunctionRole();
    this.functionCode = this.loadFunctionCode(functionCodePath);
    this._function = this.createFunction();
  }

  /**
   * Try and load the Lambda function code assets
   */
  private loadFunctionCode(path: string): lambda.AssetCode {
    try {
      return lambda.Code.fromAsset(path);
    } catch (error) {
      console.error('failed to load the function code');
      throw error;
    }
  }

  /**
   * Create the IAM role and its required policies to attach the the Lambda function
   */
  private createFunctionRole(): iam.IRole {
    const { roleArn } = this.props;
    const role = new iam.Role(this.scope, `FunctionRole`, {
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
        `FunctionRoleManagedLambdaPolicy`,
        'service-role/AWSLambdaBasicExecutionRole'
      )
    );
    return role;
  }

  /**
   * Create the Lambda function resource
   */
  private createFunction(): lambda.IFunction {
    const {
      handler,
      runtime,
      region,
      functionCode: code,
      functionRole: role,
    } = this;
    const { roleArn, roleExternalId, roleSessionName } = this.props;

    const fn = new lambda.Function(this.scope, `LambdaFunction`, {
      code,
      role,
      handler,
      runtime,
      environment: {
        REGION: region,
        ROLE_ARN: roleArn,
        ROLE_EXTERNAL_ID: roleExternalId || '',
        ROLE_SESSION_NAME:
          roleSessionName || 'halloumi_cross_account_parameter_store',
      },
      timeout: Duration.seconds(900),
      logRetention: logs.RetentionDays.FIVE_MONTHS,
    });

    return fn;
  }

  /**
   * Get the IAM Role attached to the function
   */
  public getFunctionRole(): iam.IRole {
    return this.functionRole;
  }
  /**
   * Get the function
   */
  public getFunction(): lambda.IFunction {
    return this._function;
  }
}
