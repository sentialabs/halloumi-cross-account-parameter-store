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
          ':iam::',
          {
            Ref: 'AWS::AccountId',
          },
          ':policy/service-role/AWSLambdaBasicExecutionRole',
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
