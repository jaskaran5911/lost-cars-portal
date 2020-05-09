from flask_praetorian import roles_required, roles_accepted


@roles_required('admin')
def role_admin(**kwargs):
    pass


@roles_accepted('admin', 'police-officer')
def role_police_officer(**kwargs):
    pass


@roles_accepted('admin', 'user')
def role_user(**kwargs):
    pass
