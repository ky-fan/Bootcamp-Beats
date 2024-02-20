from flask import Blueprint, jsonify, request
from app.models import Track, db, Album
from ...forms import NewTrackForm
from flask_login import current_user, login_required

track_routes = Blueprint('tracks', __name__)

@track_routes.route('/')
def track_index():
    tracks = Track.query.order_by(Track.id.desc()).all()
    # return f"{track.title for track in tracks}"
    return {'tracks': [track.to_dict() for track in tracks]}

@track_routes.route('/<int:trackId>')
def track_details(trackId):
    track = Track.query.get(trackId)
    return track.to_dict()

@track_routes.route('/user/<int:userId>')
def user_track_index(userId):
    tracks = Track.query.filter(Track.artist_id == userId).order_by(Track.id.desc()).all()
    return {'tracks': [track.to_dict() for track in tracks]}

@track_routes.route('/', methods = ['POST'])
@login_required
def create_new_track():
    form = NewTrackForm()
    form.albumId.choices = [ (album.id, album.title) for album in Album.query.filter(Album.artist_id == current_user.id).all()]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        params = {
            'artist_id': current_user.id,
            'title': form.data['title'],
            'genre': form.data['genre'],
            'url': form.data['url'],
            'duration': 123,
            'album_id': form.data['albumId'],
            'preview_image_url': form.data['previewImageUrl']
        }
        new_track = Track(**params)
        db.session.add(new_track)
        db.session.commit()
        return new_track.to_dict()

    return form.errors, 401

@track_routes.route('/<int:trackId>', methods = ['PUT'])
@login_required
def update_track(trackId):
    form = NewTrackForm()
    form.albumId.choices = [ (album.id, album.title) for album in Album.query.filter(Album.artist_id == current_user.id).all()]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        track = Track.query.get(trackId)
        track.title = form.data['title']
        track.album_id = form.data['albumId']
        track.genre = form.data['genre']
        track.url = form.data['url']
        track.preview_image_url = form.data['previewImageUrl']
        track.duration = 'Calculate duration here'

        db.session.commit()
        return track.to_dict()

    return form.errors, 401

@track_routes.route('/<int:trackId>', methods = ['DELETE'])
@login_required
def delete_track(trackId):
    track = Track.query.get(trackId)
    db.session.delete(track)
    db.session.commit()

    return {
       'message': 'Successfully deleted!'
    }
