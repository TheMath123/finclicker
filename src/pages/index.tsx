import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useGame } from '../contexts/Game'
import styles from '../styles/Home.module.scss'

type IndexProps = {
  coins: number
}

export default function Home({ coins }: IndexProps) {
  const { fincoins, setFincoins, miningCoin, enableAutoMessage } = useGame()
  const btnAutoMessageRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setFincoins(coins || 0)
  }, [coins, setFincoins])

  useEffect(() => {
    if(fincoins >=  100){
      btnAutoMessageRef.current?.removeAttribute('disabled')
    }else{
      btnAutoMessageRef.current?.disabled
    }
  }, [fincoins])

  return (
    <>
      <div className={styles.app}>
        <h3>Em construção...</h3>
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
          <h1>Loja</h1>
          <div className={styles.itens}>
            <button 
              disabled
              ref={btnAutoMessageRef}
              onClick={enableAutoMessage}
            >
              Auto message 
              <span>$100</span>
            </button>
            
            <button disabled onClick={() => alert('teste')}>WIP $X</button>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { fincoins } = ctx.req.cookies;
  return {
    props: {
      coins: Number(fincoins),
    }
  }
}
