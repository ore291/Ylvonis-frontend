import React, { useEffect, useRef } from 'react'
import player, { usePlayerState } from '@/lib/player'

function AudioSetup() {
  const element = useRef(null)

  useEffect(() => {
    // const element: HTMLAudioElement = document.createElement('audio')

    player.setInitialState(element.current)
  }, [])

  return <audio ref={element} onEnded={player.next}></audio>
}

export default AudioSetup
