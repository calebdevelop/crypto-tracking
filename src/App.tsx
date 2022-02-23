import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Wallet from './Components/wallet/Wallet';

function App() {
  return (
    <div className="app">
      <Wallet/>
    </div>
  );
}

export default App;
