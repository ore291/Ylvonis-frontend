import React, { useState, useRef } from 'react'
import {
  Sheet,
  Header,
  Content,
  Footer,
  detents,
  Portal,
} from 'react-sheet-slide'
import 'react-sheet-slide/style.css'
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
    <>
      <MobileView>
        <div className={cn(s.root)}>
          <div className={cn(s.container)}>
            <Cover coverUrl={state.playlist.imageUrl} />
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div className={cn(s.root)}>
          <div className={cn(s.container)}>
            <Cover coverUrl={state.playlist.imageUrl} />
            <div className="hidden md:block">
              <PlayerControls />
            </div>
            <PlayerVolumeControls />
          </div>
          {/* <MobileProgress /> */}
        </div>
      </BrowserView>
    </>
  )
}

export default Player
