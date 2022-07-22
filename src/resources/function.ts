import * as iam from 'aws-cdk-lib/aws-iam';
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
  /**
   * The construct scope
   */
  private readonly scope: Construct;
  /**
   * The instance props
   */
  private readonly props: FunctionProps;
  /**
   * The IAM Role of the function.
   */
  readonly functionRole: iam.IRole;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);
    this.scope = scope;
    this.props = props;
    this.functionRole = this.createFunctionRole(id);
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
}
