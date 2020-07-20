import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [display, setDisplay] = useState("");

  return (
    <div className="App">
      <Header
        userName={userId.displayName}
        setDisplay={setDisplay}
        setUserId={setUserId}
      />
      {display === "register" ? (
        <UserRegister setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
      {display === "login" ? (
        <UserLogin setUserId={setUserId} setDisplay={setDisplay} />
      ) : null}
    </div>
  );
}

export default App;
