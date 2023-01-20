import player, { usePlayerState } from '../../../lib/player'
import { VolumeIcon } from '@/components/Icons'
import { Button, Slider } from '@/components/UI'
import cn from 'clsx'
import s from './PlayerVolumeControls.module.css'
import { FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'

const PlayerVolumeControls = () => {
  const state = usePlayerState()

  const [heart, setHeart] = useState<boolean>(false)

  return (
    <div className="flex items-center justify-center space-x-1 h-full">
      {heart ? (
        <Button variant="naked" size="slim" onClick={() => setHeart(!heart)}>
          <BsFillHeartFill size={24} className="text-brand  " />
        </Button>
      ) : (
        <Button variant="naked" size="slim" onClick={() => setHeart(!heart)}>
          <BsHeart size={24} />
        </Button>
      )}

      <Button variant="naked" size="large">
        <svg
          width="24"
          height="24"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_524_366)">
            <path
              d="M24.2632 5H-1V9.14286H24.2632V5ZM24.2632 13.2857H-1V17.4286H24.2632V13.2857ZM-1 25.7143H15.8421V21.5714H-1V25.7143ZM28.4737 5V21.9546C27.8105 21.7164 27.1158 21.5714 26.3684 21.5714C22.8842 21.5714 20.0526 24.3575 20.0526 27.7857C20.0526 31.2139 22.8842 34 26.3684 34C29.8526 34 32.6842 31.2139 32.6842 27.7857V9.14286H39V5H28.4737Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_524_366">
              <rect width="38" height="38" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
      <Button variant="naked" size="large">
        <svg
          width="24"
          height="24"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3947 0C17.3567 0 18.9474 1.5614 18.9474 3.48749V16.9312C18.366 17.0101 17.7955 17.2776 17.3263 17.769L15.0527 20.1496H12.6316C11.7595 20.1496 11.0526 20.8435 11.0526 21.6996V24.7999H7.5C6.84598 24.7999 6.31579 25.3204 6.31579 25.9624C6.31579 26.6044 6.84598 27.1249 7.5 27.1249H11.2641C11.5371 27.588 12.0472 27.8996 12.6316 27.8996H15.0527L17.3263 30.2801C17.358 30.3132 17.3901 30.3453 17.4224 30.3763C16.8475 30.7694 16.1485 30.9999 15.3947 30.9999H3.55263C1.59057 30.9999 0 29.4384 0 27.5124V3.48749C0 1.5614 1.59057 0 3.55263 0H15.3947ZM28.6472 19.0674C28.1289 18.2199 27.5973 17.6399 27.2056 17.3195C26.7032 16.9084 25.9565 16.9751 25.5377 17.4683C25.119 17.9615 25.1869 18.6945 25.6893 19.1055C25.8897 19.2694 26.2462 19.6583 26.6162 20.2637C27.2499 21.3006 27.6316 22.5495 27.6316 24.0249C27.6316 25.5004 27.2499 26.7492 26.6162 27.7861C26.2462 28.3917 25.8897 28.7805 25.6893 28.9444C25.1869 29.3553 25.119 30.0883 25.5377 30.5817C25.9565 31.0749 26.7032 31.1416 27.2056 30.7305C27.5973 30.41 28.1289 29.8301 28.6472 28.9824C29.4936 27.5975 30 25.9401 30 24.0249C30 22.1097 29.4936 20.4523 28.6472 19.0674ZM25.0644 20.7645C24.6868 20.2085 24.2976 19.8266 24 19.6074C23.4769 19.2223 22.7346 19.3263 22.3421 19.8399C21.9497 20.3536 22.0558 21.0822 22.5789 21.4674C22.6762 21.539 22.8791 21.7382 23.0937 22.0541C23.4632 22.5981 23.6842 23.2495 23.6842 24.0249C23.6842 24.8004 23.4632 25.4517 23.0937 25.9957C22.8791 26.3116 22.6762 26.5109 22.5789 26.5824L22.4468 26.6956C22.0407 27.0984 21.9854 27.743 22.3421 28.2099C22.7346 28.7236 23.4769 28.8276 24 28.4424C24.2976 28.2234 24.6868 27.8413 25.0644 27.2853C25.6817 26.3763 26.0526 25.2838 26.0526 24.0249C26.0526 22.766 25.6817 21.6736 25.0644 20.7645ZM20.5263 19.7624C20.5263 19.2782 20.2205 18.8447 19.7586 18.6743C19.2968 18.504 18.7757 18.6325 18.4509 18.997L16.0416 21.6999H13.8158C13.1618 21.6999 12.6316 22.2204 12.6316 22.8624V25.1874C12.6316 25.8294 13.1618 26.3499 13.8158 26.3499H16.0416L18.4509 29.0529C18.7757 29.4175 19.2968 29.546 19.7586 29.3756C20.2205 29.2053 20.5263 28.7718 20.5263 28.2874V19.7624Z"
            fill="white"
          />
        </svg>
      </Button>
      <div className={cn(s.root)}>
        <VolumeIcon />

        <div className={cn(s.container)}>
          <Slider
            min={0}
            max={1}
            value={state.volume}
            handleChange={(value) => player.volume(value[0])}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerVolumeControls
