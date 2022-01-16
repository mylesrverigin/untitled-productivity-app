const errors: Record<string,string> = {
    'MISSING_REQ_FIELD':'Object being inserted is missing a required field',
    'UPDATE_FAILED':'Updating Data failed',
    'MISSING_ID':'Data sent is missing an Id',
    'DELETE_FAILED':'Data did not delete',
    'NO_USER_PASSWORD':'Missing username or password',
    'DATA_NOT_FOUND':'Could not find requested data',
    'PASSWORDS_NO_MATCH':'Passwords do not match',
    'PASSWORD_INCORRECT':'Password is incorrect',
    'CREATE_TOKEN_ERROR':'Error creating an auth token'
};

export default errors;