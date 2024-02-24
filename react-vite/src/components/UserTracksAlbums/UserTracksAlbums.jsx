import { useDispatch, useSelector } from 'react-redux'
import './UserTracksAlbums.css'
import { useEffect } from 'react'
import { thunkFetchUserAlbums } from '../../redux/album'
import { thunkFetchTracksByUserId } from '../../redux/track'
import { TrackCard } from '../TrackComponents/TrackCard/TrackCard'
import { AlbumCard } from '../AlbumComponents/AlbumCard/AlbumCard'
import { useParams } from 'react-router-dom'
import { thunkFetchArtist } from '../../redux/artist'

export function UserTracksAlbums() {
    const dispatch = useDispatch()
    let { userId } = useParams()
    userId = parseInt(userId)

    const tracks = useSelector(state => Object.values(state.tracks))
    const albums = useSelector(state => Object.values(state.albums))
    const artist = useSelector(state => state.artist.selected)

    const userTracks = tracks.filter(track => track.artistId === userId)
    const userAlbums = albums.filter(album => album.artistId === userId)

    useEffect(() => {
        dispatch(thunkFetchUserAlbums(userId))
        dispatch(thunkFetchTracksByUserId(userId))
        dispatch(thunkFetchArtist(userId))
        window.scrollTo(0, 0)
    }, [dispatch, userId])

    return (
        <div>
            {console.log('user tracks ', userTracks)}
            {console.log('user albums ', userAlbums)}
            {console.log('artist is ', artist)}
            <h1>{artist?.artistName}&apos;s Albums and Tracks</h1>

            <div>
                <h2>Albums</h2>
                {userAlbums.map(album => <AlbumCard album={album} key={album.id} />)}
            </div>
            <div>
                <h2>Tracks</h2>
                {userTracks.map(track => <TrackCard track={track} key={track?.id} />)}
            </div>

        </div>
    )

}

export default UserTracksAlbums;