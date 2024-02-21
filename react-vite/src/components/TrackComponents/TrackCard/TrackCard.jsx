import './TrackCard.css'
import { NavLink } from 'react-router-dom'
export function TrackCard({ track }) {

  return (
    <NavLink to={`/tracks/${track.id}`} className='track-card-link'>
      <div title={track?.title} className='track-card-container'>

        <div>
          <p>Preview Image URL: {track?.previewImageUrl}</p>
          <p>Title: {track?.title}</p>
          <p>Artist Name: {track?.artistName}</p>
        </div>
        <p>Album Title: {track?.albumTitle}</p>
        <p>Genre: {track?.genre}</p>
        <p>Track Number: {track?.trackNumber}</p>
        <p>URL: {track?.url}</p>
      </div>

    </NavLink>
  )
}
