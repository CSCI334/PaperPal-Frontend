import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import App from './App'
import './index.css'
import theme from './theme';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  </React.StrictMode>,
)
