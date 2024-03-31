import { useContext, createContext, ReactNode, useReducer, Dispatch, ReducerWithoutAction, useRef, useEffect } from "react";

import { IUserdata } from "../types/User";
import reducer from "./reducer";
import Store from "../utils/Store";
import { STORE_KEY } from "../constants";
import { INIT_STATE } from "./actions";


export type IDefaultValue = {
    userdata: IUserdata|null;
    isAuth: boolean;
    dispatch: Dispatch<any>;
}
type IGlobalContext = {
    children: ReactNode;
}
const defaultState: IDefaultValue = {
    userdata: null,
    isAuth: false,
    dispatch: dispatchEvent
}
const GlobalContext = createContext(defaultState);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({children}: IGlobalContext) => {
    const flag = useRef(true);
    const store = new Store(STORE_KEY);
    const [state, dispatch] = useReducer(reducer as ReducerWithoutAction<IDefaultValue>, defaultState);
    useEffect(() => {
        if(flag.current){
            (async() => {
                let accessKey = await store.get("accessKey");
                let userdata = await store.get("userdata");
                console.log({accessKey});
                let _state: IDefaultValue = {
                    ...defaultState,
                    userdata: userdata as IUserdata | null,
                    isAuth: !!accessKey
                }
                if(!_state.isAuth){
                    setTimeout(() => {
                        showLoginHandler();
                    }, 2000);
                }
                return _state;
            })().then(val => {
                (dispatch as any)({type: INIT_STATE, payload: val});
            })
            .catch(e => {
                console.log({error: e.message});
            })
            flag.current = false;
        }
    }, [])

    function showLoginHandler(){
        document.getElementById("login__backdrop")!.style.display = 'block';
    }


    return (
        <GlobalContext.Provider value={{...state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalContextProvider;