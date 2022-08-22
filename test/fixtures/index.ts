export const targetRole1Props = {
  arn: 'some-role-arn',
  externalId: 'some-external-id',
  sessionName: 'some-session-name',
};

export const targetRole2Props = {
  arn: 'some-role-arn-2',
  externalId: 'some-external-id-2',
  sessionName: 'some-session-name-2',
};

export const param1 = {
  name: '/name/of/parameter1',
  value: 'value-of-parameter1',
  description: 'description-of-parameter1',
};

export const param2 = {
  name: '/name/of/parameter2',
  value: 'value-of-parameter2',
  description: 'description-of-parameter2',
};

export const lambdaServiceRoleAssumeRolePolicyDocument = {
  AssumeRolePolicyDocument: {
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
      },
    ],
    Version: '2012-10-17',
  },
};

export const lambdaServiceRoleManagedPolicyArns = {
  ManagedPolicyArns: [
    {
      'Fn::Join': [
        '',
        [
          'arn:',
          {
            Ref: 'AWS::Partition',
          },
          ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        ],
      ],
    },
  ],
};

export const lambdaServiceRoleAssumeRoleAttachedPolicy = (
  roleArn: string,
  roleId: string
) => ({
  PolicyDocument: {
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Resource: roleArn,
      },
    ],
    Version: '2012-10-17',
  },
  Roles: [
    {
      Ref: roleId,
    },
  ],
});
