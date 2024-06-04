import { ReactNode, createContext, useContext, useRef } from "react";
import { GlobalStore, createGlobalStore } from "./store";


const GlobalContext = createContext<GlobalStore|null>(null);


export const useGlobalContext = () => useContext(GlobalContext);


export default function GlobalContextProvider({children}: {children: ReactNode}){
    const store = useRef(createGlobalStore()).current;

    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    )
}