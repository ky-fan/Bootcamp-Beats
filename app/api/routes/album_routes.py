from flask import Blueprint, jsonify, request
from app.models import Album, db
from app.forms import NewAlbumForm
from flask_login import current_user, login_required

album_routes = Blueprint('albums', __name__)

@album_routes.route('/')
def album_index():
    albums = Album.query.order_by(Album.id.desc()).all()
    # return f"{track.title for track in albums}"
    return {'albums': [album.to_dict() for album in albums]}

@album_routes.route('/<int:albumId>')
def album_details(albumId):
    album = Album.query.get(albumId)
    return album.to_dict()

@album_routes.route('/user/<int:userId>')
def user_album_index(userId):
    albums = Album.query.filter(Album.artist_id == userId).order_by(Album.id.desc()).all()
    return {'albums': [album.to_dict() for album in albums]}

@album_routes.route('/', methods = ['POST'])
@login_required
def create_new_album():
    form = NewAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        params = {
            'artist_id': current_user.id,
            'title': form.data['title'],
            'genre': form.data['genre'],
            'album_cover_url': form.data['albumCoverUrl'],
            'single': form.data['single'],
            'release_date': form.data['releaseDate']
        }
        new_album = Album(**params)
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()

    return form.errors, 401

@album_routes.route('/<int:albumId>', methods = ['PUT'])
@login_required
def update_album(albumId):
    form = NewAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album = Album.query.get(albumId)
        album.title = form.data['title']
        album.genre = form.data['genre']
        album.album_cover_url = form.data['albumCoverUrl']
        album.release_date = form.data['releaseDate']

        db.session.commit()
        return album.to_dict()

    return form.errors, 401

@album_routes.route('/<int:trackId>', methods = ['DELETE'])
@login_required
def delete_track(trackId):
    track = Album.query.get(trackId)
    db.session.delete(track)
    db.session.commit()

    return {
       'message': 'Successfully deleted!'
    }