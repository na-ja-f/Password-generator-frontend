import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRouter from './routes/routes.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Context/store.js'
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster theme='dark' richColors position="top-center" />
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
)
