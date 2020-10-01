from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.user import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.security.authentication import auth_func
from src.main.model.user import User as UserModel
from src.main.service.user import get_user_count_for_roles as get_user_count_for_roles_service
from src.main.security.authorization import role_admin, role_police_officer
from src.main.service.flagged_user import update_flagged_user_action

# User API object
user_api = api_manager.create_api_blueprint(
    UserModel,
    methods=['GET', 'POST', 'PUT', 'PATCH'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    allow_functions=True,
    preprocessors=dict(
        POST=[auth_func, role_admin],
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func, role_police_officer],
        PUT_SINGLE=[auth_func],
        PUT_MANY=[auth_func, role_admin],
        PATCH_SINGLE=[auth_func],
        PATCH_MANY=[auth_func, role_admin]
    ),
    postprocessors=dict(
        PUT_SINGLE=[update_flagged_user_action]
    )
)

user_api.after_request(add_cors_headers)
app.register_blueprint(user_api)


@app.route('/api/user/role/count', methods=['GET'])
def get_user_count_for_roles():
    return get_user_count_for_roles_service()

