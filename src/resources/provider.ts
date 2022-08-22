import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { FunctionConstruct, FunctionProps } from '.';

export * from './function';
export class CustomResourceProvider extends Construct {
  /**
   * The function construct containing all the Lambda functions, application logic,
   * roles and policies
   */
  private readonly functionConstruct: FunctionConstruct;
  /**
   * The provider framework with the underlying Lambda function.
   */
  private readonly providerFramework: Provider;
  /**
   * The construct scope
   */
  private readonly scope: Construct;
  /**
   * The instance props
   */
  private readonly props: FunctionProps;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);
    this.props = props;
    this.scope = scope;
    this.functionConstruct = this.createFunctionConstruct(id);
    this.providerFramework = this.createProviderFramework(id);
  }

  private createFunctionConstruct(id: string) {
    const { roleArn, roleExternalId, roleSessionName } = this.props;
    const functionConstruct = new FunctionConstruct(
      this.scope,
      `${id}FunctionConstruct`,
      {
        roleArn,
        roleExternalId,
        roleSessionName,
      }
    );
    return functionConstruct;
  }

  private createProviderFramework(id: string) {
    const provider = new Provider(this.scope, `${id}Provider`, {
      onEventHandler: this.functionConstruct.gFunction(),
    });
    return provider;
  }

  public gProviderFramework(): Provider {
    return this.providerFramework;
  }
}
