import { StrictMode } from 'react'
import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux';
import { store } from './redux/store/Store'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </QueryClientProvider>
)
