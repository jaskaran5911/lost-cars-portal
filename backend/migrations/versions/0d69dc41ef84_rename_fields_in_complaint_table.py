"""rename fields in complaint table

Revision ID: 0d69dc41ef84
Revises: 3ed5a7caf729
Create Date: 2020-05-28 12:45:15.426208

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0d69dc41ef84'
down_revision = '3ed5a7caf729'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('complaint', sa.Column('responded_by', sa.Integer(), nullable=True))
    op.drop_constraint('complaint_ibfk_2', 'complaint', type_='foreignkey')
    op.create_foreign_key(None, 'complaint', 'user', ['responded_by'], ['id'])
    op.drop_column('complaint', 'accepted_by')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('complaint', sa.Column('accepted_by', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'complaint', type_='foreignkey')
    op.create_foreign_key('complaint_ibfk_2', 'complaint', 'user', ['accepted_by'], ['id'])
    op.drop_column('complaint', 'responded_by')
    # ### end Alembic commands ###
