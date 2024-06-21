import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { setupStore } from './store/store.ts'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
    <App />
    </Provider>
  </React.StrictMode>,
)
