import { useState, useEffect } from "react";

function useAudioPlayer(id: string) {
  const [duration, setDuration] = useState(0)
  const [curTime, setCurTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [clickedTime, setClickedTime] = useState<number | null>(null)

  useEffect(() => {
    const audio = document.getElementById(id) as HTMLAudioElement

    audio.volume = 0.1

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration)
      setCurTime(audio.currentTime)
    }

    const setAudioTime = () => setCurTime(audio.currentTime)

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData)

    audio.addEventListener("timeupdate", setAudioTime)

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause()

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime
      setClickedTime(null)
    }

    if (muted) {
      audio.volume = 0
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
    }
  });

  return {
    curTime,
    duration,
    playing,
    muted,
    setPlaying,
    setClickedTime,
    setMuted
  }
}

export default useAudioPlayer