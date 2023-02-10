import React, { useState, useRef } from 'react'
import { usePlayerState } from '../../lib/player'
import { PlayerVolumeControls } from './PlayerVolumeControls'
import { Cover } from './Cover'
import PlayerControls from './PlayerControls'
import cn from 'clsx'
import s from './Player.module.css'
import { MobileProgress } from './MobileProgress'
import { BrowserView, MobileView } from 'react-device-detect'
import { Button } from '../UI'
import { FaRegHeart } from 'react-icons/fa'

const Player = () => {
  const { currentTrack } = usePlayerState()
  const state = usePlayerState()
  if (!currentTrack) {
    return null
  }

  return (
    <div>
      <MobileView>
        <div className={cn(s.root)}>
          <div className={cn(s.container)}>
            <Cover coverUrl={state?.currentTrack?.coverArt} />
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div className={cn(s.root)}>
          <div className={cn(s.container)}>
            <Cover coverUrl={state?.currentTrack?.coverArt} />
            <div className="hidden md:block">
              <PlayerControls />
            </div>
            <PlayerVolumeControls />
          </div>
          {/* <MobileProgress /> */}
        </div>
      </BrowserView>
    </div>
  )
}

export default Player
