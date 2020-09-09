from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.flagged_user import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.model.flagged_user import FlaggedUser as FlaggedUserModel
from src.main.security.authorization import role_admin, role_police_officer
from src.main.security.authentication import auth_func
from src.main.service.flagged_user import flagged_user_count

# Flagged API object
flagged_user_api = api_manager.create_api_blueprint(
    FlaggedUserModel,
    collection_name='flagged-user',
    methods=['GET', 'POST'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    allow_functions=True,
    preprocessors=dict(
        GET_SINGLE=[auth_func, role_admin],
        GET_MANY=[auth_func, role_admin],
        POST=[auth_func, role_police_officer],
        PUT_SINGLE=[auth_func, role_admin]
    ),
    postprocessors=dict(
        POST=[flagged_user_count]
    )
)

flagged_user_api.after_request(add_cors_headers)
app.register_blueprint(flagged_user_api)
