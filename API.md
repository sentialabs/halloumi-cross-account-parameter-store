# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### HalloumiCrossAccountParameterStore <a name="HalloumiCrossAccountParameterStore" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore"></a>

#### Initializers <a name="Initializers" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer"></a>

```typescript
import { HalloumiCrossAccountParameterStore } from 'halloumi-cross-account-parameter-store'

new HalloumiCrossAccountParameterStore(scope: Construct, id: string, props: CustomResourceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.props">props</a></code> | <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps">CustomResourceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.Initializer.parameter.props"></a>

- *Type:* <a href="#halloumi-cross-account-parameter-store.CustomResourceProps">CustomResourceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="halloumi-cross-account-parameter-store.HalloumiCrossAccountParameterStore.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

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

### CustomResourceProps <a name="CustomResourceProps" id="halloumi-cross-account-parameter-store.CustomResourceProps"></a>

#### Initializer <a name="Initializer" id="halloumi-cross-account-parameter-store.CustomResourceProps.Initializer"></a>

```typescript
import { CustomResourceProps } from 'halloumi-cross-account-parameter-store'

const customResourceProps: CustomResourceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps.property.parameterName">parameterName</a></code> | <code>string</code> | The name of the parameter on the target account that is going to be managed. |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps.property.parameterValue">parameterValue</a></code> | <code>any</code> | The value of the parameter on the target account. |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps.property.roleArn">roleArn</a></code> | <code>string</code> | The ARN of the role on the target account that the STS client on the Lambda function assumes and has permissions to create, update and delete a parameter on that account. |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps.property.parameterDescription">parameterDescription</a></code> | <code>string</code> | Optional: A description for the parameter. |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps.property.roleExternalId">roleExternalId</a></code> | <code>string</code> | Optional: Information that you can use in an IAM role trust policy to designate who can assume the role. |
| <code><a href="#halloumi-cross-account-parameter-store.CustomResourceProps.property.roleSessionName">roleSessionName</a></code> | <code>string</code> | Optional: IAM role session name when STS client on the Lambda function assumes the role on the target account. |

---

##### `parameterName`<sup>Required</sup> <a name="parameterName" id="halloumi-cross-account-parameter-store.CustomResourceProps.property.parameterName"></a>

```typescript
public readonly parameterName: string;
```

- *Type:* string

The name of the parameter on the target account that is going to be managed.

---

##### `parameterValue`<sup>Required</sup> <a name="parameterValue" id="halloumi-cross-account-parameter-store.CustomResourceProps.property.parameterValue"></a>

```typescript
public readonly parameterValue: any;
```

- *Type:* any

The value of the parameter on the target account.

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="halloumi-cross-account-parameter-store.CustomResourceProps.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

The ARN of the role on the target account that the STS client on the Lambda function assumes and has permissions to create, update and delete a parameter on that account.

---

##### `parameterDescription`<sup>Optional</sup> <a name="parameterDescription" id="halloumi-cross-account-parameter-store.CustomResourceProps.property.parameterDescription"></a>

```typescript
public readonly parameterDescription: string;
```

- *Type:* string
- *Default:* undefined

Optional: A description for the parameter.

---

##### `roleExternalId`<sup>Optional</sup> <a name="roleExternalId" id="halloumi-cross-account-parameter-store.CustomResourceProps.property.roleExternalId"></a>

```typescript
public readonly roleExternalId: string;
```

- *Type:* string

Optional: Information that you can use in an IAM role trust policy to designate who can assume the role.

---

##### `roleSessionName`<sup>Optional</sup> <a name="roleSessionName" id="halloumi-cross-account-parameter-store.CustomResourceProps.property.roleSessionName"></a>

```typescript
public readonly roleSessionName: string;
```

- *Type:* string

Optional: IAM role session name when STS client on the Lambda function assumes the role on the target account.

Default is `halloumi_cross_account_parameter_store`.

---



