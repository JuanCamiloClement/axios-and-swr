import React from 'react'
import ReactDOM from 'react-dom/client'
import AxiosExample from './App.jsx'
import SWRExample from './SWR.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SWRExample />
  </React.StrictMode>,
)
