import os


def get_optional_prop(properties: dict, key: str):
    value = properties[key]
    if not value:
        return None
    return value


def get_mandatory_prop(properties: dict, key: str):
    value = properties[key]
    if not value:
        raise ValueError(f"The resource property {key} is required.")
    return value


def get_optional_env(key: str, value=None):
    return os.getenv(key, value)


def get_mandatory_env(key: str):
    value = os.getenv(key)
    if not value:
        raise ValueError(f"The ENV VAR {key} is required.")
    return value
