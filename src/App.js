import React, { useState, useEffect } from "react";
import "./App.css";
import STORE from "./Services/STORE";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  const [userId, setUserId] = useState("");
  const [display, setDisplay] = useState("");

  return (
    <div className="App">
      <Dashboard />
      {/* <Header
        userName={userId.displayName}
        setDisplay={setDisplay}
        setUserId={setUserId}
      />
      {display === "register" ? (
        <UserRegister setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
      {display === "login" ? (
        <UserLogin setUserId={setUserId} setDisplay={setDisplay} />
      ) : null} */}
    </div>
  );
}

export default App;
