from flask import jsonify


def get_security_payload(user):
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'roles': list(row.name for row in user.roles)
    })


def exclude_columns():
    return ['password']
