from src.main.model import db
from src.main.model.entity import Entity


# FlaggedUser Model Class
class FlaggedUser(Entity, db.Model):
    user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    text = db.Column(db.Text)
    action = db.Column(db.String(50), default='PENDING')
    status = db.Column(db.Boolean, default=True)
    flagged_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.text = kwargs['text']
        self.user = kwargs.get('user', None)
        self.action = kwargs.get('action', None)
        self.flagged_by = kwargs['flagged_by']
