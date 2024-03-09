import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <NextUIProvider>
      <main className="love text-foreground bg-background">
        <App />
      </main>
    </NextUIProvider>
  // </React.StrictMode>,
)
