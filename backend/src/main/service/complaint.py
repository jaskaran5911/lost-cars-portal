from flask import request

from src.main.dto.complaint import complaint_file_upload as complaint_file_upload_dto
from src.main.exception.exception import handle400, handle404, handle405
from src.main.model import db
from src.main.model.complaint import Complaint
from src.main.util.file_upload import upload_file


def complaint_file_upload(complaint_id):
    if request.method == 'PATCH':
        if 'file' not in request.files:
            return handle400()

        file = request.files['file']
        if file.filename == '':
            return handle400()

        filename = upload_file(file)
        complaint = Complaint.query.filter_by(id=complaint_id).first()
        if complaint:
            complaint.file_name = filename
            db.session.commit()
            return complaint_file_upload_dto()

        else:
            return handle404()
    else:
        return handle405()
