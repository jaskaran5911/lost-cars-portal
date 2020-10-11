from src.main.model.complaint import Complaint
from src.main.model.user import User
from src.main.service.email import send_email as send_email_service


def send_email(result):
    complaint = Complaint.query.filter_by(id=result['complaint']).first()
    if complaint.complaint_by == int(result['commented_by']):
        sent_to = complaint.responded_by
    else:
        sent_to = complaint.complaint_by

    user = User.query.filter_by(id=sent_to).first()
    commented_by = User.query.filter_by(id=result['commented_by']).first()
    send_email_service.apply_async(args=[{
        'email_to': user.email,
        'subject': 'New Comment on complaint',
        'body': 'Hey ' + str(user.name) + ',\n Complaint no. ' + str(result['id']) + ' has new Comment.\n ' +
                str(result['text']) + '. \n Commented by: ' + str(commented_by.name)
    }])
