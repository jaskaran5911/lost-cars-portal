from flask import jsonify


# create response object
def get_security_payload(user):
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'roles': list(row.name for row in user.roles)
    })


# Remove the columns from the response
def exclude_columns():
    return [
        'password',
        'comments',
        'flagged_counter'
    ]
