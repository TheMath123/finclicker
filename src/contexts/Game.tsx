import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

// Conexto
type GameContextData = {
  fincoins: number
  setFincoins: (coins: number) => void
  miningCoin: () => void
  enableAutoMessage: () => void
}

export const GameContext = createContext({} as GameContextData)


// Provider
type Feature = {
  item: string
  enable: boolean
}

type Features = {
  features: Feature[]
}

type GameContextProviderProps = {
  children: ReactNode;
}

export default function GameContextProvider({ children }: GameContextProviderProps){ //Component
  const [fincoins, setFincoins] = useState(0);
  const [bonus, setBonus] = useState(1);
  const [features, setFeatures] = useState([])

  useEffect(() => { //Salvando nos cookies
    Cookies.set('fincoins', String(fincoins));
    console.log(fincoins)
  }, [fincoins])


  function miningCoin(){
    setFincoins((fincoins + 1) * bonus)
  }

  function enableAutoMessage(){
    const item = { enableAutoMessage: true }
    setFeatures([])
    timerSetCoin(true, 1000) //1 Segundo
  }

  function timerSetCoin(enable: boolean, time: number){
    while(enable){
      setTimeout(() => {
        miningCoin()
      }, time)
    }
  }

  return(
    <GameContext.Provider
      value={{
        fincoins,
        setFincoins,
        miningCoin,
        enableAutoMessage,
      }}
    >
      { children }
    </GameContext.Provider>
  )
}

//

export const useGame = () => { //Hack para não ter importar o useContext e react toda vez
  return useContext(GameContext);
}