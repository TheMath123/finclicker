import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useGame } from '../contexts/Game'
import styles from '../styles/Home.module.scss'

import messages from '../assets/menssages.json'

type IndexProps = {
  coins: number
}

export default function Home({ coins }: IndexProps) {
  const { fincoins, setFincoins, sendingMessageBird, enableAutoMining } = useGame()
  const btnAutoMessageRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setFincoins(coins || 0)
  }, [coins, setFincoins])

  function handlerAutoMining(){
    enableAutoMining()
    btnAutoMessageRef.current?.removeAttribute('disabled')
  }

  function handlerSendingMessage(){
    sendingMessageBird()
    btnAutoMessageRef.current?.disabled
    const timer = setTimeout(() => {
      btnAutoMessageRef.current?.removeAttribute('disabled')
    }, 5000);
  }

  return (
    <>
      <div className={styles.app}>
        <h3>Em construção...</h3>
        <main className={styles.main}>
          <span>Fincoin: ${fincoins}</span>

          <textarea disabled>
            Manipulando mercado
          </textarea>

          <button onClick={() => handlerSendingMessage()} >
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
              onClick={() => handlerAutoMining()}
              ref={btnAutoMessageRef}
            >
              Criando a FinCoorporation
              <span>$10000</span>
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
