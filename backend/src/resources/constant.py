# HTTP Response message
STATUS_MESSAGE = dict(
    NOT_AUTHORIZED='Not Authorized',
    BAD_REQUEST='Bad Request',
    METHOD_NOT_ALLOWED='Method not allowed',
    NOT_FOUND='Not found',
    INTERNAL_SERVER_ERROR='Internal server error'
)

# HTTP ERROR Code
STATUS_CODE = dict(
    ER_400=400,
    ER_401=401,
    ER_404=404,
    ER_405=405,
    ER_500=500
)

# HTTP Error message
ERROR_MESSAGE = dict(
    PASSWORD_NOT_MATCHED='Password not matched',
    INVALID_PASSWORD='Invalid Password',
    EMAIL_ALREADY_EXISTS='Email address already exists!',
)

# HTTP Success message
SUCCESS_MESSAGE = dict(
    PASSWORD_CHANGED='Password changed',
    SIGN_UP='Successfully sign up!',
)
