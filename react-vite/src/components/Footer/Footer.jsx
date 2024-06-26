import { useDispatch, useSelector } from 'react-redux'
import './Footer.css'
// import { useState } from 'react'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useRef } from 'react';
import { setIsPlayingTrack } from '../../redux/playingTrack';

export function Footer() {
  const dispatch = useDispatch();

  const playingTrack = useSelector(state => state.playingTrack['selected'])
  const isPlaying = useSelector(state => state.playingTrack.isPlaying);

  // const [isPlaying, setIsPlaying] = useState(false)

  const src = playingTrack?.url

  // useEffect(() => {
  //   if (playingTrack) togglePlay()
  // })

  // const audio = new Audio(src)
  // function togglePlay() {
  //   if (audio.paused) {
  //     setIsPlaying(true)
  //     audio.play()
  //   } else {
  //     setIsPlaying(false)
  //     audio.pause()
  //   }
  // }

  const audioElement = useRef();


  useEffect(() => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.current.audio.current.play();
    } else {
      audioElement.current.audio.current.pause();
    }
  }, [isPlaying])

  return (
    <>
      <AudioPlayer
        className='track-player'
        autoPlay
        header={playingTrack ? playingTrack.title : 'No track selected'}
        onPlay={() => {
          dispatch(setIsPlayingTrack(true))
        }}
        onPause={() => {
          dispatch(setIsPlayingTrack(false))
        }}
        onEnded={() => {
          dispatch(setIsPlayingTrack(false))
        }}
        ref={audioElement}
        src={src}
      // onPlay={e => console.log("onPlay")}
      // other props here
      />
    </>


    // <div className='track-player'>
    //   <div>
    //     <h2>{playingTrack ? playingTrack?.title : 'No track selected'}</h2>
    //     {playingTrack && <p>{playingTrack?.artistName}</p>}
    //   </div>
    //   <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    // </div>
  )
}
