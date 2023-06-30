import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContext } from './Context/ContextApi';
import { AuthContextProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppContext>
        <App />
      </AppContext>
    </AuthContextProvider>
  </React.StrictMode>
);

