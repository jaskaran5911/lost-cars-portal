from src.main.model import db
from src.main.model.entity import Entity


class Comment(Entity, db.Model):
    complaint = db.Column(db.Integer, db.ForeignKey('complaint.id'), nullable=True)
    text = db.Column(db.Text)
    sent_email = db.Column(db.BOOLEAN, default=False)
    status = db.Column(db.Boolean, default=True)
    commented_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.text = kwargs['text']
        self.complaint = kwargs.get('complaint', None)
        self.sent_email = kwargs.get('sent_email', False)
        self.commented_by = kwargs['commented_by']
