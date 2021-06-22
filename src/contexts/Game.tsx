import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

// Conexto
type GameContextData = {
  fincoins: number
  setFincoins: (coins: number) => void
  sendingMessageBird: () => void
  enableAutoMining: () => void
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
  const [autoMining, setAutoMining] = useState(false)

  useEffect(() => { //Salvando nos cookies
    Cookies.set('fincoins', String(fincoins));
    console.log(fincoins)
  }, [fincoins])

  let variable = 0.6

  function sendingMessageBird(){
    setBonus(bonus * variable)
    variable = variable * 0.3
  }

  function miningCoin(){
    setFincoins(fincoins + 1 * bonus)
  }

  function enableAutoMining(){
    if(!autoMining){
      setFincoins(fincoins - 100)
      setAutoMining(true)
    }
  }

  useEffect(() => { //Mineração de Fincoins
    if(autoMining){
      const timer = setTimeout(() => {
        miningCoin()
      }, 1000);
    }
  });

  return(
    <GameContext.Provider
      value={{
        fincoins,
        setFincoins,
        sendingMessageBird,
        enableAutoMining,
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