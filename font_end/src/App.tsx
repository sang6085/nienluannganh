import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import axios from "axios";

function App() {
  const onClick = () => {
    axios({
      method: "GET",
      url: "/api/v3/category/list?page=0&pageSize=10",
      //data: {name: "Tech"},
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTE3YjFmYzUyMTIzMzU2Y2UwMTIxODUiLCJpYXQiOjE2MjkwNTA5ODAsImV4cCI6MTYyOTA1NDU4MH0.ohRGovc-_MB8P0vX-sDpQ1fg9KiMWi5qZUPlDg6zzQE",
         Accept: 'application/json',
			   'Content-Type': 'application/json',
      }
    }).then((res)=>{
      console.log(res);
      
    }).catch((err)=>{
      console.log(err.response);
      
    });
  };
  return (
    <div className="App">
      <button onClick={onClick}>login</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
