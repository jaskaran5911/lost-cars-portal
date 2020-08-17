from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.comment import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.model.comment import Comment as CommentModel
from src.main.security.authentication import auth_func

comment_api = api_manager.create_api_blueprint(
    CommentModel,
    methods=['GET', 'POST'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    allow_functions=True,
    preprocessors=dict(
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func],
        POST=[auth_func]
    )
)

comment_api.after_request(add_cors_headers)
app.register_blueprint(comment_api)
