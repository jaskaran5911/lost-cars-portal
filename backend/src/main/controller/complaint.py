from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.complaint import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.model.complaint import Complaint as ComplaintModel
from src.main.security.authentication import auth_func
from src.main.security.authorization import role_admin, role_police_officer
from src.main.service.complaint import complaint_file_upload as complaint_file_upload_service
from src.main.util.file_upload import get_uploaded_file as get_uploaded_file_service

complaint_api = api_manager.create_api_blueprint(
    ComplaintModel,
    methods=['GET', 'POST', 'PUT', 'PATCH'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    preprocessors=dict(
        POST=[auth_func],
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func],
        PUT_SINGLE=[auth_func, role_police_officer],
        PUT_MANY=[auth_func, role_admin],
        PATCH_SINGLE=[auth_func, role_police_officer],
        PATCH_MANY=[auth_func, role_admin]
    )
)

complaint_api.after_request(add_cors_headers)
app.register_blueprint(complaint_api)


@app.route('/api/complaint/upload/<int:complaint_id>', methods=['PATCH'])
def complaint_file_upload(complaint_id):
    return complaint_file_upload_service(complaint_id)


@app.route('/api/complaint/download/<path:filename>', methods=['GET'])
def get_uploaded_file(filename):
    return get_uploaded_file_service(filename)
