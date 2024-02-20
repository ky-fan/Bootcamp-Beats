from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, URL
from ..models import Album
from flask_login import current_user

# albums = []
# for album in albums:
#     album_choices.append((album.id, album.title))



class NewTrackForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    albumId = SelectField('album_id', choices = [])
    genre = StringField('genre', validators=[DataRequired()])
    trackNumber = IntegerField('track_number')
    url = StringField('url', validators=[DataRequired()])
    previewImageUrl = StringField('url')
