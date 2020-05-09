from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app import app
from src.main.model import db, db_user_data_store


migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


def set_role_data():
    db_user_data_store().find_or_create_role(name='admin', description='Administrator')
    db_user_data_store().find_or_create_role(name='police-officer', description='Police Office')
    db_user_data_store().find_or_create_role(name='user', description='User')


def create_admin_user():
    if not db_user_data_store().get_user('admin@lostcar.com'):
        db_user_data_store().create_user(
            name='admin',
            email='admin@lostcar.com',
            password='admin'
        )
        db_user_data_store().add_role_to_user('admin@lostcar.com', 'admin')
        db.session.commit()


def before_first_request():
    set_role_data()
    create_admin_user()


if __name__ == '__main__':
    manager.run()
