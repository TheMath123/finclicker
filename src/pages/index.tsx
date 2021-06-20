import Image from 'next/image'
import React, { useEffect } from 'react'
import { useGame } from '../contexts/Game'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const { fincoins, miningCoin } = useGame()

  useEffect(() => {
    console.log(document.cookie)
  }, [])

  return (
      <div className={styles.app}>
        <strong>Em construção...</strong>
        <main className={styles.main}>
          <span>Fincoin: ${fincoins}</span>
          <button onClick={() => miningCoin()} >
            <Image 
              src="/birdblue.png"
              alt="BirdBlue"
              width={32}
              height={32}
              objectFit="fill"
            />
            <strong>Enviar BirdMessage</strong>
          </button>
        </main>
        <footer className={styles.shop}>
          <span>Loja</span>
          <button>Auto message</button>
          <button>WIP</button>
        </footer>
      </div>
  )
}

