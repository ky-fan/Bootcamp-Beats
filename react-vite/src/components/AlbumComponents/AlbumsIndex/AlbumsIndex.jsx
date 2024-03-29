import { useEffect } from 'react';
import './AlbumsIndex.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkFetchAlbums } from '../../../redux/album';
import { AlbumCard } from '../AlbumCard/AlbumCard';

export function AlbumsIndex() {
    const dispatch = useDispatch();


    const albumsObj = useSelector(state => state.albums)
    const albums = Object.values(albumsObj)

    useEffect(() => {
        dispatch(thunkFetchAlbums())
    }, [dispatch, albums.length])

    return (

        <div className='album-index-container'>
            <h1>Albums</h1>

            <div className='album-index'>
                <div className='album-index-cards-container'>
                    {albums.map(album => <AlbumCard album={album} key={album.id} />)}
                </div>
            </div>
        </div>
    )
}

export default AlbumsIndex;
