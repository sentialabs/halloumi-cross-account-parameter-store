import { Construct } from 'constructs';
import { HalloumiCrossAccountParameterStoreFunction } from './resources/function';

export class HalloumiCrossAccountParameterStore extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new HalloumiCrossAccountParameterStoreFunction(scope, 'Function', {
      roleArn: 'some-arn',
    });
  }
}
