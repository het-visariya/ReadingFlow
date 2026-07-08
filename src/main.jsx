import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/carousel-globals.css';
import './styles/carousel-intro.css';
import './styles/carousel-portfolio.css';
import './styles/carousel-stage.css';
import './styles/carousel-explore-panel.css';
import './styles/carousel-responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
