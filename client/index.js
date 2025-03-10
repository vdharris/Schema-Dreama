import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './styles/styles.css';


const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
