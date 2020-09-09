from flask import jsonify


# Logout DTO
def logout():
    return jsonify({
        'message': 'logged out'
    }), 200
