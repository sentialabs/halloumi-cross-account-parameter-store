import logging
import json
import cfnresponse
from lib import CrossAccountParameterStore
from utils import (
    get_mandatory_prop,
    get_optional_prop,
    get_optional_env,
    get_mandatory_env,
)

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_environment_variables() -> dict:
    logger.info("Reading environment variables")
    return {
        "region": get_mandatory_env("REGION"),
        "role_arn": get_mandatory_env("ROLE_ARN"),
        "role_external_id": get_optional_env("ROLE_EXTERNAL_ID"),
        "role_session_name": get_optional_env("ROLE_SESSION_NAME"),
    }


def get_resource_properties(props: dict) -> dict:
    logger.info("Reading resource properties")
    logger.info(json.dumps(props))
    return {
        "parameter_name": get_mandatory_prop(props, "PARAMETER_NAME"),
        "parameter_value": get_mandatory_prop(props, "PARAMETER_VALUE"),
        "parameter_description": get_optional_prop(
            props, "PARAMETER_DESCRIPTION"
        ),
    }


def create_cross_account_ssm_client(props: dict):
    client = CrossAccountParameterStore(
        region=props["region"],
        parameter_name=props["parameter_name"],
        parameter_value=props["parameter_value"],
        parameter_description=props["parameter_description"],
        role_arn=props["role_arn"],
        role_external_id=props["role_external_id"],
        role_session_name=props["role_session_name"],
    )
    return client


def on_event(event, context):
    logger.info(event)
    request_type = event["RequestType"]

    envs = get_environment_variables()
    resource_props = get_resource_properties(event["ResourceProperties"])

    props = dict(list(envs.items()) + list(resource_props.items()))
    ssm_client = create_cross_account_ssm_client(props)

    response = False

    if request_type == "Create" or request_type == "Update":
        response = ssm_client.put_parameter()

    if request_type == "Delete":
        response = ssm_client.delete_parameter()

    responseData = {"success": response}
    cfn_response = cfnresponse.FAILED
    if response:
        cfn_response = cfnresponse.SUCCESS

    cfnresponse.send(event, context, cfn_response, responseData)
