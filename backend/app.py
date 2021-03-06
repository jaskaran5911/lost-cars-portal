from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from flask_praetorian import Praetorian
from flask_restless import APIManager
from flask_security import Security

import flask_monitoringdashboard as dashboard

from src.main.controller import load_controller
from src.main.dto import load_dto
from src.main.exception import load_exception
from src.main.http import load_http
from src.main.http.background_jobs import make_celery
from src.main.model import db, load_model, db_user_data_store
from src.main.security import load_security
from src.main.service import load_service
from src.main.util import load_utils
from src.resources.config import Config, BASE_DIR

app = Flask(__name__, template_folder=Config.TEMPLATE_FOLDER)
app.config.from_object(Config())

# CORS
CORS(app)

# JWT
jwt = Praetorian()


@app.route('/')
def index():
    return jsonify({
        'message': 'Welcome to Lost Car Portal!'
    })


with app.app_context():
    # DB init
    db.init_app(app)
    load_model()
    db.create_all()

    # Security
    security = Security(app, db_user_data_store())

    # Background Celery
    celery = make_celery(app)

    # Mail
    mail = Mail(app)

    # REST API
    api_manager = APIManager(app, flask_sqlalchemy_db=db)

    # Load all the modules
    load_http()
    load_utils()
    load_security()
    load_exception()
    load_controller()
    load_dto()
    load_service()

    # System Profiler Monitor
    dashboard.config.init_from(file=BASE_DIR + '/profiler-config.cfg')
    dashboard.bind(app)

    # Create a user admin
    @app.before_first_request
    def create_admin_user():
        # Create the Roles -- unless they already exist
        db_user_data_store().find_or_create_role(name='admin', description='Administrator')
        db_user_data_store().find_or_create_role(name='police-officer', description='Police Office')
        db_user_data_store().find_or_create_role(name='user', description='User')

        if not db_user_data_store().get_user('lostcarsportal@gmail.com'):
            db_user_data_store().create_user(
                name='admin',
                email='lostcarsportal@gmail.com',
                password='admin'
            )
            db.session.commit()
            db_user_data_store().add_role_to_user('lostcarsportal@gmail.com', 'admin')
            db.session.commit()


if __name__ == '__main__':
    app.run(host='0.0.0.0')
