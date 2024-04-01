import React, { Suspense } from 'react'
import {createRoot} from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import {RouterProvider} from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import router from './router.ts';
import './index.css'
import theme from './theme.ts'
import GlobalContextProvider from './contexts/GlobalContext.tsx';


const queryClient = new QueryClient({
});



const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <QueryClientProvider client={queryClient}>
          <Suspense 
          fallback={
            <div>
              LOADING!!!
            </div>
            // <NotFound animationData={animationData}>
            //   <button>Back Home</button>
            // </NotFound>
          }>
          <RouterProvider router={router} />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
)
