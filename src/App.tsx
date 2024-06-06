const App = () => {
    const store = useGlobalContext();
    const theme = useStore(store as StoreApi<GlobalState>, (state) => state.theme);

    console.log({theme});
    return (
        <AppWrapper id={theme === 'light' ? 'light' : 'dark'}>
            <Suspense
              fallback={<SuspenseLoader />}
            >
              <RouterProvider router={router} />
            </Suspense>
        </AppWrapper>
    )
}



import { Suspense } from "react"
import styled from "styled-components"
import { RouterProvider } from "react-router-dom"

import SuspenseLoader from "./components/SuspenseLoader";
import router from "./router"
import { useGlobalContext } from "./contexts/GlobalContext"
import { StoreApi, useStore } from "zustand";
import { GlobalState } from "./contexts/store";



const AppWrapper = styled.div`
    width: 100%;
    height: 100%;

    &#dark {
        --secondary-main: #000;
        --secondary-light: rgb(17, 17, 17);
        --secondary-dark: rgb(36, 36, 33);
        --dark-main: rgb(205, 205, 205);
        --dark-light: rgb(161, 154, 141);
        --backdrop: rgba(255,255,255,.05);
    }
`;



export default App;