import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <Header userName={userId.displayName} />
      <UserRegister setUserId={setUserId} />
      <UserLogin setUserId={setUserId} />
    </div>
  );
}

export default App;
