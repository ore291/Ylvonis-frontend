import React, { useEffect } from 'react'
import player from '@/lib/player'

function AudioSetup() {
  useEffect(() => {
    const element: HTMLAudioElement = document.createElement('audio')
    player.setInitialState(element)
    player.loadTrack()
    console.log('created audio')
  }, [])
  return <></>
}

export default AudioSetup
