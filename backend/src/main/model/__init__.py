from flask_security import SQLAlchemyUserDatastore
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def load_model():
    import src.main.model.entity
    import src.main.model.role
    import src.main.model.user
    import src.main.model.roles_user
    import src.main.model.complaint
    import src.main.model.comment
    import src.main.model.flagged_user


def db_user_data_store():
    from src.main.model.role import Role
    from src.main.model.user import User

    return SQLAlchemyUserDatastore(db, User, Role)
