from flask import request, jsonify

from src.main.dto.complaint import complaint_file_upload as complaint_file_upload_dto
from src.main.exception.exception import handle400, handle404, handle405
from src.main.model import db
from src.main.model.complaint import Complaint
from src.main.util.file_upload import upload_file


# File upload service
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


def get_complaint_count_by_status():
    result_json = []
    results = db.session \
        .query(Complaint.complaint_status, db.func.count(Complaint.id)) \
        .group_by(Complaint.complaint_status) \
        .all()
    for result in results:
        result_json.append({
            'name': result[0],
            'y': result[1]
        })
    return jsonify(result_json)


def get_complaint_count_by_status_with_responded_by(id_):
    result_json = []
    results = db.session \
        .query(Complaint.complaint_status, db.func.count(Complaint.id)) \
        .filter(Complaint.responded_by == id_) \
        .group_by(Complaint.complaint_status) \
        .all()
    for result in results:
        result_json.append({
            'name': result[0],
            'y': result[1]
        })
    return jsonify(result_json)


def get_complaint_count_by_status_with_complaint_by(id_):
    result_json = []
    results = db.session \
        .query(Complaint.complaint_status, db.func.count(Complaint.id)) \
        .filter(Complaint.complaint_by == id_) \
        .group_by(Complaint.complaint_status) \
        .all()
    for result in results:
        result_json.append({
            'name': result[0],
            'y': result[1]
        })
    return jsonify(result_json)


def get_complaint_count_by_status_and_complaint_by(id_, complaint_status):
    result = db.session \
        .query(Complaint.complaint_status, db.func.count(Complaint.id)) \
        .filter(Complaint.complaint_by == id_) \
        .filter(Complaint.complaint_status == complaint_status) \
        .group_by(Complaint.complaint_status) \
        .first()
    if result:
        return jsonify({
            'count__id': result[1]
        })
    else:
        return jsonify({
            'count__id': 0
        })


def get_complaint_count_by_status_and_responded_by(id_, complaint_status):
    result = db.session \
        .query(Complaint.complaint_status, db.func.count(Complaint.id)) \
        .filter(Complaint.responded_by == id_) \
        .filter(Complaint.complaint_status == complaint_status) \
        .group_by(Complaint.complaint_status) \
        .first()
    if result:
        return jsonify({
            'count__id': result[1]
        })
    else:
        return jsonify({
            'count__id': 0
        })


def get_complaint_count_by_responded_by(id_):
    result = db.session \
        .query(db.func.count(Complaint.id)) \
        .filter(Complaint.responded_by == id_) \
        .group_by(Complaint.responded_by) \
        .first()
    if result:
        return jsonify({
            'count__id': result[0]
        })
    else:
        return jsonify({
            'count__id': 0
        })


def get_complaint_count_by_complaint_by(id_):
    result = db.session \
        .query(db.func.count(Complaint.id)) \
        .filter(Complaint.complaint_by == id_) \
        .group_by(Complaint.complaint_by) \
        .first()
    if result:
        return jsonify({
            'count__id': result[0]
        })
    else:
        return jsonify({
            'count__id': 0
        })
