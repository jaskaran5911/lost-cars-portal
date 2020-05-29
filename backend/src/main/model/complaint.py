from src.main.model import db
from src.main.model.entity import Entity


class Complaint(Entity, db.Model):
    title = db.Column(db.String(50))
    text = db.Column(db.Text)
    address = db.Column(db.Text)
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    country = db.Column(db.String(255))
    pin_code = db.Column(db.Integer)
    vehicle_number = db.Column(db.String(15))
    vehicle_details = db.Column(db.Text)
    file_name = db.Column(db.String(255), nullable=True)
    complaint_status = db.Column(db.String(50), default='PENDING')
    complaint_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    responded_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True, default=None)
    response_details = db.Column(db.Text, nullable=True, default=None)
    status = db.Column(db.Boolean, default=True)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.title = kwargs['title']
        self.text = kwargs['text']
        self.address = kwargs['address']
        self.vehicle_number = kwargs['vehicle_number']
        self.vehicle_details = kwargs['vehicle_details']
        self.city = kwargs['city']
        self.state = kwargs['state']
        self.country = kwargs['country']
        self.pin_code = kwargs['pin_code']
        self.file_name = kwargs.get('file_name', None)
        self.complaint_status = kwargs.get('complaint_status', None)
        self.complaint_by = kwargs['complaint_by']
        self.responded_by = kwargs.get('responded_by', None)
