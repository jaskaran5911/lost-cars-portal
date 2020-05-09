from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.user import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.security.authentication import auth_func
from src.main.model.user import User as UserModel
from src.main.security.authorization import role_admin, role_police_officer

user_api = api_manager.create_api_blueprint(
    UserModel,
    methods=['GET', 'POST', 'PUT', 'PATCH'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        POST=[auth_func, role_admin],
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func, role_police_officer],
        PUT_SINGLE=[auth_func],
        PUT_MANY=[auth_func, role_admin],
        PATCH_SINGLE=[auth_func],
        PATCH_MANY=[auth_func, role_admin]
    )
)

user_api.after_request(add_cors_headers)
app.register_blueprint(user_api)
