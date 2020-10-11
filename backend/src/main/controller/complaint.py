from flask_restless.views import ValidationError

from app import api_manager, app
from src.main.dto.complaint import exclude_columns
from src.main.http.cros_headers import add_cors_headers
from src.main.model.complaint import Complaint as ComplaintModel
from src.main.security.authentication import auth_func
from src.main.security.authorization import role_admin, role_police_officer
from src.main.service.complaint import complaint_file_upload as complaint_file_upload_service, send_email
from src.main.service.complaint import get_complaint_count_by_status as get_complaint_count_by_status_service
from src.main.service.complaint import \
    get_complaint_count_by_status_with_responded_by as get_complaint_count_by_status_with_responded_by_service
from src.main.service.complaint import \
    get_complaint_count_by_status_with_complaint_by as get_complaint_count_by_status_with_complaint_by_service
from src.main.service.complaint import \
    get_complaint_count_by_status_and_responded_by as get_complaint_count_by_status_and_responded_by_service
from src.main.service.complaint import \
    get_complaint_count_by_status_and_complaint_by as get_complaint_count_by_status_and_complaint_by_service
from src.main.service.complaint import \
    get_complaint_count_by_responded_by as get_complaint_count_by_responded_by_service
from src.main.service.complaint import \
    get_complaint_count_by_complaint_by as get_complaint_count_by_complaint_by_service
from src.main.util.file_upload import get_uploaded_file as get_uploaded_file_service

# Complaint API object
complaint_api = api_manager.create_api_blueprint(
    ComplaintModel,
    methods=['GET', 'POST', 'PUT', 'PATCH'],
    exclude_columns=exclude_columns(),
    validation_exceptions=[ValidationError],
    allow_functions=True,
    preprocessors=dict(
        POST=[auth_func],
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func],
        PUT_SINGLE=[auth_func, role_police_officer],
        PUT_MANY=[auth_func, role_admin],
        PATCH_SINGLE=[auth_func, role_police_officer],
        PATCH_MANY=[auth_func, role_admin]
    ),
    postprocessors=dict(
        PATCH_SINGLE=[send_email]
    )
)

complaint_api.after_request(add_cors_headers)
app.register_blueprint(complaint_api)


# Complaint File upload API
@app.route('/api/complaint/upload/<int:complaint_id>', methods=['PATCH'])
def complaint_file_upload(complaint_id):
    return complaint_file_upload_service(complaint_id)


# Complaint File download API
@app.route('/api/complaint/download/<path:filename>', methods=['GET'])
def get_uploaded_file(filename):
    return get_uploaded_file_service(filename)


@app.route('/api/complaint/status/count', methods=['GET'])
def get_complaint_count_by_status():
    return get_complaint_count_by_status_service()


@app.route('/api/complaint/count/responded_by/<int:id_>', methods=['GET'])
def get_complaint_count_by_responded_by(id_):
    return get_complaint_count_by_responded_by_service(id_)


@app.route('/api/complaint/count/complaint_by/<int:id_>', methods=['GET'])
def get_complaint_count_by_complaint_by(id_):
    return get_complaint_count_by_complaint_by_service(id_)


@app.route('/api/complaint/status/count/responded_by/<int:id_>', methods=['GET'])
def get_complaint_count_by_status_with_responded_by(id_):
    return get_complaint_count_by_status_with_responded_by_service(id_)


@app.route('/api/complaint/status/count/complaint_by/<int:id_>', methods=['GET'])
def get_complaint_count_by_status_with_complaint_by(id_):
    return get_complaint_count_by_status_with_complaint_by_service(id_)


@app.route('/api/complaint/status/count/responded_by/<string:complaint_status>/<int:id_>', methods=['GET'])
def get_complaint_count_by_status_and_responded_by(complaint_status, id_):
    return get_complaint_count_by_status_and_responded_by_service(id_, complaint_status)


@app.route('/api/complaint/status/count/complaint_by/<string:complaint_status>/<int:id_>', methods=['GET'])
def get_complaint_count_by_status_and_complaint_by(complaint_status, id_):
    return get_complaint_count_by_status_and_complaint_by_service(id_, complaint_status)
