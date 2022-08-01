import { CustomResource } from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { FunctionConstruct, FunctionProps } from './resources';

export interface CustomResourceProps extends FunctionProps {
  /**
   * The name of the parameter on the target account that is going to be managed.
   */
  readonly parameterName: string;
  /**
   * The value of the parameter on the target account.
   */
  readonly parameterValue: unknown;
  /**
   * Optional: A description for the parameter.
   * @default undefined
   */
  readonly parameterDescription?: string;
}

export class HalloumiCrossAccountParameterStore extends Construct {
  /**
   * The construct scope
   */
  private readonly scope: Construct;
  /**
   * The instance props
   */
  private readonly props: CustomResourceProps;
  /**
   * The function construct containing all the Lambda functions, application logic,
   * roles and policies
   */
  private readonly functionConstruct: FunctionConstruct;

  constructor(scope: Construct, id: string, props: CustomResourceProps) {
    super(scope, id);
    this.props = props;
    this.scope = scope;
    this.functionConstruct = this.createFunctionConstruct(id);
    this.createCustomResource(id);
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

  private createCustomResource(id: string) {
    const { parameterName, parameterValue, parameterDescription } = this.props;
    const provider = new Provider(this.scope, `${id}Provider`, {
      onEventHandler: this.functionConstruct.getFunction(),
    });

    const customResource = new CustomResource(
      this.scope,
      `${id}CustomResource`,
      {
        serviceToken: provider.serviceToken,
        properties: {
          PARAMETER_NAME: parameterName,
          PARAMETER_VALUE: parameterValue,
          PARAMETER_DESCRIPTION: parameterDescription,
        },
      }
    );
    return customResource;
  }
}
