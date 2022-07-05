import React from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from 'uuid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {v1()}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Todolist project for Heroku
        </p>
      </header>
    </div>
  );
}

export default App;
