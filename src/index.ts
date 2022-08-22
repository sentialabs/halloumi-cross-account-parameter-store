import { CustomResource } from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { CustomResourceProvider } from './resources';

export interface ParameterManagerProps {
  /**
   * An instance of the `CustomResourceProvider`
   */
  readonly customResourceProvider: CustomResourceProvider;
  /**
   * The name of the parameter on the target account that is going to be managed.
   */
  readonly parameterName: string;
  /**
   * The value of the parameter on the target account.
   */
  readonly parameterValue: unknown;
  /**
   * A description for the parameter.
   */
  readonly parameterDescription: string;
}

export * from './resources/provider';

export class HalloumiCrossAccountParameterStore extends Construct {
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
  private readonly props: ParameterManagerProps;

  constructor(scope: Construct, id: string, props: ParameterManagerProps) {
    super(scope, id);
    this.props = props;
    this.scope = scope;
    this.providerFramework = props.customResourceProvider.gProviderFramework();
    this.createParameterManager(id);
  }

  public createParameterManager(id: string) {
    const { parameterName, parameterValue, parameterDescription } = this.props;

    const parameterManagerCustomResource = new CustomResource(
      this.scope,
      `${id}CustomResource`,
      {
        serviceToken: this.providerFramework.serviceToken,
        properties: {
          PARAMETER_NAME: parameterName,
          PARAMETER_VALUE: parameterValue,
          PARAMETER_DESCRIPTION: parameterDescription,
        },
      }
    );
    return parameterManagerCustomResource;
  }
}
