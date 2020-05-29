from flask import jsonify


def exclude_columns():
    return [
        'complaint_user.password',
        'complaint_user.created_at',
        'complaint_user.updated_at',
        'complaint_user.last_updated_by',
        'complaint_user.last_login_at',
        'complaint_user.current_login_at',
        'complaint_user.last_login_ip',
        'complaint_user.current_login_ip',
        'complaint_user.login_count',
        'responded_by.password',
        'responded_by.created_at',
        'responded_by.updated_at',
        'responded_by.last_updated_by',
        'responded_by.last_login_at',
        'responded_by.current_login_at',
        'responded_by.last_login_ip',
        'responded_by.current_login_ip',
        'responded_by.login_count'
    ]


def complaint_file_upload():
    return jsonify({
        'message': 'Successfully uploaded!!!'
    }), 200
