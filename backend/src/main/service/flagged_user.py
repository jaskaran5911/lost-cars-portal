from src.main.model import db
from src.main.model.flagged_user import FlaggedUser
from src.main.model.user import User


# flagged count service
def flagged_user_count(result=None, **kwargs):
    if result and 'user' in result and result['user'] is not None:
        user = User.query.filter_by(id=result['user']).first()
        if user:
            if user.flagged_counter:
                user.flagged_counter += 1
            else:
                user.flagged_counter = 1

            flagged_users = FlaggedUser.query.filter_by(user=user.id).all()
            for flagged_user in flagged_users:
                flagged_user.action = 'PENDING'
            db.session.commit()
    return


# update the status of flagged user
def update_flagged_user_action(result=None, **kwargs):
    if result and 'id' in result and result['id'] is not None:
        users = FlaggedUser.query.filter_by(user=result['id']).all()
        for user in users:
            if 'active' in result:
                if result['active'] is True:
                    user.action = 'REACTIVATED'
                else:
                    user.action = 'DEACTIVATED'
        db.session.commit()
    return
