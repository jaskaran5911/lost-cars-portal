from flask_security import UserMixin

from app import jwt
from src.main.model import db
from src.main.model.entity import Entity
from src.main.model.roles_user import roles_users
from src.main.dto.user import get_security_payload as get_security_payload_dto


# User Model Class
class User(Entity, db.Model, UserMixin):
    email = db.Column(db.String(255), unique=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(60))
    active = db.Column(db.Boolean, default=True)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))
    complaint_by = db.relationship(
        'Complaint', foreign_keys='Complaint.complaint_by', backref='complaint_user', lazy=True
    )
    responded_by = db.relationship(
        'Complaint', foreign_keys='Complaint.responded_by', backref='responded_user', lazy=True
    )
    comments = db.relationship('Comment', backref='users', lazy=True)
    flagged_counter = db.Column(db.Integer, nullable=True, default=0)
    flagged_user = db.relationship(
        'FlaggedUser', foreign_keys='FlaggedUser.user', backref='flagged_user', lazy=True
    )
    flagged_by = db.relationship(
        'FlaggedUser', foreign_keys='FlaggedUser.flagged_by', backref='flagged_user_by', lazy=True
    )

    last_login_at = db.Column(db.DateTime(), nullable=True)
    current_login_at = db.Column(db.DateTime(), nullable=True)
    last_login_ip = db.Column(db.String(255), nullable=True)
    current_login_ip = db.Column(db.String(255), nullable=True)
    login_count = db.Column(db.Integer, nullable=True, default=0)

    def __init__(self, last_updated_by='system', **kwargs):
        super().__init__(last_updated_by)
        self.email = kwargs['email']
        self.name = kwargs['name']
        self.password = kwargs['password']

    def __setattr__(self, key, value):
        if key == 'password':
            value = jwt.hash_password(value)
        super().__setattr__(key, value)

    def get_security_payload(self):
        return get_security_payload_dto(self)

    @property
    def rolenames(self):
        return list(row.name for row in self.roles)

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(email=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.active

    def __repr__(self):
        return '<User[email=%s]>' % self.email
