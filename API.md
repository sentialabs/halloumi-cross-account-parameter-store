# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CustomResourceProvider <a name="CustomResourceProvider" id="halloumi-cross-account-parameter-store.CustomResourceProvider"></a>

#### Initializers <a name="Initializers" id="halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer"></a>

```typescript
import { CustomResourceProvider } from 'halloumi-cross-account-parameter-store'

new CustomResourceProvider(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer.parameter.props">props</a></code> | <code><a href="#halloumi-cross-account-parameter-store.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="halloumi-cross-account-parameter-store.CustomResourceProvider.Initializer.parameter.props"></a>

- *Type:* <a href="#halloumi-cross-account-parameter-store.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.gProviderFramework">gProviderFramework</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="halloumi-cross-account-parameter-store.CustomResourceProvider.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `gProviderFramework` <a name="gProviderFramework" id="halloumi-cross-account-parameter-store.CustomResourceProvider.gProviderFramework"></a>

```typescript
public gProviderFramework(): Provider
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="halloumi-cross-account-parameter-store.CustomResourceProvider.isConstruct"></a>

```typescript
import { CustomResourceProvider } from 'halloumi-cross-account-parameter-store'

CustomResourceProvider.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="halloumi-cross-account-parameter-store.CustomResourceProvider.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="halloumi-cross-account-parameter-store.CustomResourceProvider.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### FunctionConstruct <a name="FunctionConstruct" id="halloumi-cross-account-parameter-store.FunctionConstruct"></a>

#### Initializers <a name="Initializers" id="halloumi-cross-account-parameter-store.FunctionConstruct.Initializer"></a>

```typescript
import { FunctionConstruct } from 'halloumi-cross-account-parameter-store'

new FunctionConstruct(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.Initializer.parameter.props">props</a></code> | <code><a href="#halloumi-cross-account-parameter-store.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="halloumi-cross-account-parameter-store.FunctionConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="halloumi-cross-account-parameter-store.FunctionConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="halloumi-cross-account-parameter-store.FunctionConstruct.Initializer.parameter.props"></a>

- *Type:* <a href="#halloumi-cross-account-parameter-store.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.gFunction">gFunction</a></code> | Get the function. |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.gFunctionRole">gFunctionRole</a></code> | Get the IAM Role attached to the function. |

---

##### `toString` <a name="toString" id="halloumi-cross-account-parameter-store.FunctionConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `gFunction` <a name="gFunction" id="halloumi-cross-account-parameter-store.FunctionConstruct.gFunction"></a>

```typescript
public gFunction(): IFunction
```

Get the function.

##### `gFunctionRole` <a name="gFunctionRole" id="halloumi-cross-account-parameter-store.FunctionConstruct.gFunctionRole"></a>

```typescript
public gFunctionRole(): IRole
```

Get the IAM Role attached to the function.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="halloumi-cross-account-parameter-store.FunctionConstruct.isConstruct"></a>

```typescript
import { FunctionConstruct } from 'halloumi-cross-account-parameter-store'

FunctionConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="halloumi-cross-account-parameter-store.FunctionConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="halloumi-cross-account-parameter-store.FunctionConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### HalloumiCrossAccountParameterStore <a name="HalloumiCrossAccountParameterStore" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore"></a>

#### Initializers <a name="Initializers" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer"></a>

```typescript
import { HalloumiCrossAccountParameterStore } from 'halloumi-cross-account-parameter-store'

new HalloumiCrossAccountParameterStore(scope: Construct, id: string, props: ParameterManagerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.props">props</a></code> | <code><a href="#halloumi-cross-account-parameter-store.ParameterManagerProps">ParameterManagerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.props"></a>

- *Type:* <a href="#halloumi-cross-account-parameter-store.ParameterManagerProps">ParameterManagerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.createParameterManager">createParameterManager</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `createParameterManager` <a name="createParameterManager" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.createParameterManager"></a>

```typescript
public createParameterManager(id: string): CustomResource
```

###### `id`<sup>Required</sup> <a name="id" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.createParameterManager.parameter.id"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.isConstruct"></a>

```typescript
import { HalloumiCrossAccountParameterStore } from 'halloumi-cross-account-parameter-store'

HalloumiCrossAccountParameterStore.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### FunctionProps <a name="FunctionProps" id="halloumi-cross-account-parameter-store.FunctionProps"></a>

#### Initializer <a name="Initializer" id="halloumi-cross-account-parameter-store.FunctionProps.Initializer"></a>

```typescript
import { FunctionProps } from 'halloumi-cross-account-parameter-store'

const functionProps: FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionProps.property.roleArn">roleArn</a></code> | <code>string</code> | The ARN of the role on the target account that the STS client on the Lambda function assumes and has permissions to create, update and delete a parameter on that account. |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionProps.property.roleExternalId">roleExternalId</a></code> | <code>string</code> | Optional: Information that you can use in an IAM role trust policy to designate who can assume the role. |
| <code><a href="#halloumi-cross-account-parameter-store.FunctionProps.property.roleSessionName">roleSessionName</a></code> | <code>string</code> | Optional: IAM role session name when STS client on the Lambda function assumes the role on the target account. |

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="halloumi-cross-account-parameter-store.FunctionProps.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

The ARN of the role on the target account that the STS client on the Lambda function assumes and has permissions to create, update and delete a parameter on that account.

---

##### `roleExternalId`<sup>Optional</sup> <a name="roleExternalId" id="halloumi-cross-account-parameter-store.FunctionProps.property.roleExternalId"></a>

```typescript
public readonly roleExternalId: string;
```

- *Type:* string

Optional: Information that you can use in an IAM role trust policy to designate who can assume the role.

---

##### `roleSessionName`<sup>Optional</sup> <a name="roleSessionName" id="halloumi-cross-account-parameter-store.FunctionProps.property.roleSessionName"></a>

```typescript
public readonly roleSessionName: string;
```

- *Type:* string

Optional: IAM role session name when STS client on the Lambda function assumes the role on the target account.

Default is `halloumi_cross_account_parameter_store`.

---

### ParameterManagerProps <a name="ParameterManagerProps" id="halloumi-cross-account-parameter-store.ParameterManagerProps"></a>

#### Initializer <a name="Initializer" id="halloumi-cross-account-parameter-store.ParameterManagerProps.Initializer"></a>

```typescript
import { ParameterManagerProps } from 'halloumi-cross-account-parameter-store'

const parameterManagerProps: ParameterManagerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.ParameterManagerProps.property.customResourceProvider">customResourceProvider</a></code> | <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProvider">CustomResourceProvider</a></code> | An instance of the `CustomResourceProvider`. |
| <code><a href="#halloumi-cross-account-parameter-store.ParameterManagerProps.property.parameterDescription">parameterDescription</a></code> | <code>string</code> | A description for the parameter. |
| <code><a href="#halloumi-cross-account-parameter-store.ParameterManagerProps.property.parameterName">parameterName</a></code> | <code>string</code> | The name of the parameter on the target account that is going to be managed. |
| <code><a href="#halloumi-cross-account-parameter-store.ParameterManagerProps.property.parameterValue">parameterValue</a></code> | <code>any</code> | The value of the parameter on the target account. |

---

##### `customResourceProvider`<sup>Required</sup> <a name="customResourceProvider" id="halloumi-cross-account-parameter-store.ParameterManagerProps.property.customResourceProvider"></a>

```typescript
public readonly customResourceProvider: CustomResourceProvider;
```

- *Type:* <a href="#halloumi-cross-account-parameter-store.CustomResourceProvider">CustomResourceProvider</a>

An instance of the `CustomResourceProvider`.

---

##### `parameterDescription`<sup>Required</sup> <a name="parameterDescription" id="halloumi-cross-account-parameter-store.ParameterManagerProps.property.parameterDescription"></a>

```typescript
public readonly parameterDescription: string;
```

- *Type:* string

A description for the parameter.

---

##### `parameterName`<sup>Required</sup> <a name="parameterName" id="halloumi-cross-account-parameter-store.ParameterManagerProps.property.parameterName"></a>

```typescript
public readonly parameterName: string;
```

- *Type:* string

The name of the parameter on the target account that is going to be managed.

---

##### `parameterValue`<sup>Required</sup> <a name="parameterValue" id="halloumi-cross-account-parameter-store.ParameterManagerProps.property.parameterValue"></a>

```typescript
public readonly parameterValue: any;
```

- *Type:* any

The value of the parameter on the target account.

---



