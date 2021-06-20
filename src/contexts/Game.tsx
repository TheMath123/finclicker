import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Conexto
type GameContextData = {
  fincoins: number
  miningCoin: () => void
}

export const GameContext = createContext({} as GameContextData)

// Provider
type GameContextProviderProps = {
  children: ReactNode;
}

export default function GameContextProvider({ children }: GameContextProviderProps){ //Component
  const [fincoins, setFincoins] = useState(0);

  function miningCoin(){
    setFincoins(fincoins + 1)
  }

  function enableAutoMessage(){
    
  }

  return(
    <GameContext.Provider
      value={{
        fincoins,
        miningCoin,
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