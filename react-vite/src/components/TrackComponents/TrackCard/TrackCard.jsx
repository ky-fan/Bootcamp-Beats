import './TrackCard.css'
import { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { thunkToggleLikeTrack } from '../../../redux/track'
import { useDispatch } from 'react-redux'

export function TrackCard({ track, setPlayingTrack }) {
  const dispatch = useDispatch()

  const [liked, setLiked] = useState('')

  // audio player stuff
  const [play] = useState(false)
  // const trackRef = useRef < HTMLAudioElement > (null)
  //   // const MAX = 20

  // function toggleAudio() {
  //   if (play) {
  //     trackRef.current?.pause()
  //     setPlay(false)
  //   } else {
  //     trackRef.current?.play()
  //     setPlay(true)
  //   }
  // }

  useEffect(() => {
    setLiked(track?.liked)
  }, [track])

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(thunkToggleLikeTrack(track?.id))
  }

  return (
    <div title={track?.title} className='track-card-container'>

      <NavLink to={`/tracks/${track?.id}`} className='track-card-link'>
        <div className='track-card-header-container'>
          <div className="track-card-image-container">
            <img src={track?.previewImageUrl} alt="Track Preview Image" />
          </div>
          <p>Preview Image URL: {track?.previewImageUrl}</p>
          <p>Title: {track?.title}</p>
          <p>Artist Name: {track?.artistName}</p>
        </div>
        <p>Album Title: {track?.albumTitle}</p>
        <p>Genre: {track?.genre}</p>
        <p>Track Number: {track?.trackNumber}</p>
      </NavLink>
      <button type="button" onClick={() => setPlayingTrack(track)}>Select</button>
      {/* <audio ref={trackRef} src={track?.url} /> */}
      <p>URL: {track?.url}</p>
      <p>Liked: {track?.liked ? 'True' : 'False'}</p>
      <button onClick={handleSubmit}>{liked ? 'Unlike' : 'Like'}</button>
    </div>
  )
}
