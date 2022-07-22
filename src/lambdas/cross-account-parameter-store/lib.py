import logging
import boto3
from typing import Any


class CrossAccountParameterStore:
    """
    This class is used to set and delete a parameter on a target account.
    """

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    def __init__(
        self,
        region: str,
        role_arn: str,
        parameter_name: str,
        parameter_value: str,
        parameter_description: str = "",
        role_external_id: str = "",
        role_session_name: str = "cross_account_put_delete_parameter",
    ) -> None:

        self.region = region
        self.parameter_name = parameter_name
        self.parameter_value = parameter_value
        self.parameter_description = parameter_description
        self.ssm_client = self.create_ssm_client(
            role_arn=role_arn,
            role_session_name=role_session_name,
            role_external_id=role_external_id,
        )

    def create_ssm_client(
        self, role_arn, role_session_name, role_external_id
    ) -> Any:
        sts_client = boto3.client("sts", region_name=self.region)
        acct_b = sts_client.assume_role(
            RoleArn=role_arn,
            RoleSessionName=role_session_name,
            ExternalId=role_external_id,
        )
        access_key = acct_b["Credentials"]["AccessKeyId"]
        secret_key = acct_b["Credentials"]["SecretAccessKey"]
        session_token = acct_b["Credentials"]["SessionToken"]
        ssm_client = boto3.client(
            "ssm",
            region_name=self.region,
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            aws_session_token=session_token,
        )
        return ssm_client

    def put_parameter(self) -> bool:
        self.logger.info(f"Trying to create/update {self.parameter_name}")
        try:
            self.ssm_client.put_parameter(
                Name=self.parameter_name,
                Description=self.parameter_description,
                Value=self.parameter_value,
                Type="String",
                Overwrite=True,
                Tier="Standard",
                DataType="text",
            )

            self.logger.info(
                f"Parameter {self.parameter_name} was created/updated"
            )
            return True
        except Exception as e:
            self.logger.error(
                f"Failure to create/update {self.parameter_name}: "
            )
            self.logger.error(e)
            return False

    def delete_parameter(self) -> bool:
        self.logger.info(f"Trying to delete {self.parameter_name}")
        try:
            self.ssm_client.delete_parameter(Name=self.parameter_name)

            self.logger.info(
                f"Parameter {self.parameter_name} was successfully deleted"
            )
            return True
        except Exception as e:
            self.logger.error(f"Failure to delete {self.parameter_name}: ")
            self.logger.error(e)
            return False
