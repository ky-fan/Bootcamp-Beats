from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text
from .users import hun, kevin, collin


def seed_tracks():
        # collin
    # collin_track1 = Track(
    #     artist_id = '3', album_id = 1, title = 'Believe', duration = 239, genre = 'Pop', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track2 = Track(
    #     artist_id = '3', album_id = 2, title = 'Holding Out for a Hero', duration = 251, genre = 'Pop', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track3 = Track(
    #     artist_id = '3', album_id = 3, title = 'Data drive', duration = 300, genre = 'EDM', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track4 = Track(
    #     artist_id = '3', album_id = 3, title = 'Digital dreams', duration = 291, genre = 'EDM', track_number = 2, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track5 = Track(
    #     artist_id = '3', album_id = 3, title = 'Code Jam', duration = 201, genre = 'Pop', track_number = 3, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track6 = Track(
    #     artist_id = '3', album_id = 3, title = 'Syntax Symphony', duration = 224, genre = 'Pop', track_number = 4, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track7 = Track(
    #     artist_id = '3', album_id = 3, title = 'Binary Boogie', duration = 196, genre = 'Pop', track_number = 5, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track8 = Track(
    #     artist_id = '3', album_id = 3, title = 'Byte-sized Beats', duration = 213, genre = 'Pop', track_number = 6, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track9 = Track(
    #     artist_id = '3', album_id = 3, title = 'Loop Logic', duration = 198, genre = 'Pop', track_number = 7, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track10 = Track(
    #     artist_id = '3', album_id = 3, title = 'Pixel Pulse', duration = 189, genre = 'Pop', track_number = 8, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track11 = Track(
    #     artist_id = '3', album_id = 3, title = 'Bit Bounce', duration = 199, genre = 'Pop', track_number = 9, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # collin_track12 = Track(
    #     artist_id = '3', album_id = 3, title = 'Cybernetic Serenade', duration = 214, genre = 'Pop', track_number = 10, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')

    # # kevin
    # kevin_track1 = Track(
    #     artist_id = '2', album_id = 4, title = 'Genesis', duration = 234, genre = 'EDM', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # kevin_track2 = Track(
    #     artist_id = '2', album_id = 4, title = 'Technologic', duration = 284, genre = 'EDM', track_number = 2, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')

    # # hun
    # hun_track1 = Track(
    #     artist_id = '1', album_id = 1, title = "World's smallest violin", duration = 240, genre = 'Pop', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
    # hun_track2 = Track(
    #     artist_id = '1', album_id = 1, title = "Bang!", duration = 171, genre = 'Pop', track_number = 2, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')

    tracks = [
    # collin
        Track(artist_id = '3', album_id = 1, title = 'Data drive', duration = 300, genre = 'EDM', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com', track_likes = [hun, kevin, collin]),
        Track(artist_id = '3', album_id = 1, title = 'Digital dreams', duration = 291, genre = 'EDM', track_number = 2, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Code Jam', duration = 201, genre = 'Pop', track_number = 3, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Syntax Symphony', duration = 224, genre = 'Pop', track_number = 4, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Binary Boogie', duration = 196, genre = 'Pop', track_number = 5, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Byte-sized Beats', duration = 213, genre = 'Pop', track_number = 6, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Loop Logic', duration = 198, genre = 'Pop', track_number = 7, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Pixel Pulse', duration = 189, genre = 'Pop', track_number = 8, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Bit Bounce', duration = 199, genre = 'Pop', track_number = 9, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '3', album_id = 1, title = 'Cybernetic Serenade', duration = 214, genre = 'Pop', track_number = 10, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),

    # kevin
        Track(artist_id = '2', album_id = 4, title = 'Genesis', duration = 234, genre = 'EDM', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '2', album_id = 4, title = 'Technologic', duration = 284, genre = 'EDM', track_number = 2, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),

    # hun
        Track(artist_id = '1', album_id = 2, title = "World's smallest violin", duration = 240, genre = 'Pop', track_number = 1, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com'),
        Track(artist_id = '1', album_id = 2, title = "Bang!", duration = 171, genre = 'Pop', track_number = 2, url = 'ineedaurl.com', preview_image_url = 'ineedanotherurl.com')
        ]

    db.session.add_all(tracks)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tracks"))

    db.session.commit()
