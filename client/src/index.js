import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import AppProvider from './context/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense>
        <AppProvider>
        <App />
        </AppProvider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

