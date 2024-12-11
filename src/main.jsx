import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bootstrap.min.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ffStore from './redux/ffStore.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={ffStore}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
</Provider>
  </StrictMode>,
)
