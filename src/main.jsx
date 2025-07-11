import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DatasetProvider } from './context/DatasetContext.jsx'
import { FilesProvider } from './context/FilesContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DatasetProvider>
        <FilesProvider>
          <App />
        </FilesProvider>
      </DatasetProvider>
    </BrowserRouter>
  </StrictMode>,
)

