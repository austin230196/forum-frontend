import React, { Suspense } from 'react'
import {createRoot} from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import {RouterProvider} from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'react-loading-skeleton/dist/skeleton.css'

import router from './router.ts';
import './index.css'
import theme from './theme.ts'
import GlobalContextProvider from './contexts/GlobalContext.tsx';
import SuspenseLoader from './components/SuspenseLoader.tsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true
    }
  }
});



const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
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
          <GlobalContextProvider>
            <Suspense 
              fallback={<SuspenseLoader />}
            >
              <RouterProvider router={router} />
            </Suspense>
          </GlobalContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
  </React.StrictMode>,
)
