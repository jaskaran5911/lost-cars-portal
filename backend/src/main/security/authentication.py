from flask_praetorian import auth_required

from app import app, jwt
from src.main.model.user import User


jwt.init_app(app, User)


# Generate JWT to authenticate the user
def generate_jwt_token(email, password):
    return jwt.encode_jwt_token(
            jwt.authenticate(email, password)
        )


# Generate refreshed JWT
def get_jwt_token_refresh():
    return jwt.refresh_jwt_token(jwt.read_token_from_header())


@auth_required
def auth_func(**kwargs):
    pass
