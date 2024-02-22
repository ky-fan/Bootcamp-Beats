import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateTrack, thunkFetchTrackById, thunkUpdateTrack } from '../../../redux/track'
import "./TrackForm.css";
import { useParams } from "react-router-dom";
import { thunkCreateAlbum } from "../../../redux/album";

function TrackFormPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [genre, setGenre] = useState("");
  const [trackNumber, setTrackNumber] = useState();
  const [trackFile, setTrackFile] = useState();
  const [previewImage, setPreviewImage] = useState()
  const [isUpdate, setIsUpdate] = useState(false)

  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [valErrors, setValErrors] = useState({});

  const [albums, setAlbums] = useState([])

  useEffect(() => { //fetch the albums when the component mounts so that the dropdown has options
    const fetchAlbums = async () => {
      const response = await fetch('/api/albums');
      const data = await response.json();
      setAlbums(data.albums)
    }
    fetchAlbums()
  }, [])

  useEffect(() => {
    if (trackId) {
      setIsUpdate(true)
      dispatch(thunkFetchTrackById(trackId)).then((oldTrack) => {
        console.log(oldTrack)
        setTitle(oldTrack.title)
        setAlbumId(oldTrack.albumId)
        setGenre(oldTrack.genre)
        setTrackNumber(oldTrack.trackNumber)
      })
    }
  }, [trackId, dispatch])

  useEffect(() => {
    const errors = {}
    if (!isUpdate && !trackFile) errors.trackFile = "Need a file for track"
    setValErrors(errors)
    console.log(valErrors)
  }, [trackFile, hasSubmitted, isUpdate])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (Object.keys(valErrors).length > 0) return null

    let albumIdTemp = albumId;
    if (!albumId) {
      const albumFormData = new FormData()
      albumFormData.append('title', `${title} - Single`)
      albumFormData.append('releaseDate', new Date().toISOString().split('T')[0])
      albumFormData.append('genre', genre)
      if (previewImage) {
        albumFormData.append('albumCoverUrl', previewImage)
      }

      const responseAlbum = await dispatch(thunkCreateAlbum(albumFormData))
      setAlbumId(responseAlbum.id)

      albumIdTemp = responseAlbum.id
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('albumId', albumIdTemp)
    formData.append('genre', genre)
    formData.append('trackNumber', trackNumber)
    console.log('trackFile is :', trackFile)
    formData.append('trackFile', trackFile)
    formData.append('previewImage', previewImage)
    formData.append('submit', true)

    if (trackId) {
      // console.log('trackId: ', trackId)
      // console.log('formData: ', formData)
      dispatch(thunkUpdateTrack(trackId, formData)).then(() => navigate(`/tracks/${trackId}`))
    } else {
      dispatch(thunkCreateTrack(formData)).then(newTrack => navigate(`/tracks/${newTrack.id}`))
    }


    // setTitle('')
    // setAlbumId()
    // setGenre()
    // setTrackFile()
    // setPreviewImage()
    // setHasSubmitted(false)
    // setErrors([])
  };

  return (
    <>
      {console.log('albumId: ', albumId)}
      <h1>Track Form</h1>
      {/* {valErrors.length > 0 && hasSubmitted == true &&
        valErrors.map((message) => <p key={message}>{message}</p>)} */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Album
          <select
            name="album"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          >
            <option value="">(Single)</option>
            {albums.map(album => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Genre
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </label>
        <label>
          Track Number
          <input
            type="number"
            name="track_number"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Track File
          {valErrors.trackFile && hasSubmitted == true && <span className="validation-error">{valErrors.trackFile}</span>}
          <input
            type="file"
            name="track_file"
            onChange={(e) => setTrackFile(e.target.files[0])}
            accept="audio/*"
          />
        </label>
        <label>
          Album Cover
          <input
            type="file"
            name="album_cover"
            onChange={(e) => setPreviewImage(e.target.files[0])}
            accept="image/*"
          />
        </label>


        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default TrackFormPage;
