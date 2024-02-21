import { useEffect } from 'react';
import './TracksIndex.css'
import {useDispatch, useSelector} from 'react-redux'
import { thunkFetchTracks } from '../../../redux/track';
import { TrackCard } from '../TrackCard/TrackCard';

export function TracksIndex() {
  const dispatch = useDispatch();
  

  const tracksObj = useSelector(state => state.tracks)
  console.log('tracksObj: ', tracksObj)
  const tracks = Object.values(tracksObj)

  useEffect(() => {
    dispatch(thunkFetchTracks())
  }, [dispatch]) 

  return (
    <div>
        <div className='track-index-container'>
            <h1>Tracks in BootCamp Beats</h1>

            <div>
                <div className='track-index-cards-container'>
                    {tracks.map(track => <TrackCard track={track} key={track?.id} />)}
                </div>
            </div>
        </div>
    </div>
)
}

export default TracksIndex;