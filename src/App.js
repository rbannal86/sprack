import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";

function App() {
  return (
    <div className="App">
      <UserRegister />
      <Header />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
