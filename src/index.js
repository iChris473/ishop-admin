import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


