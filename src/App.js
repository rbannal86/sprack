import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import FSServices from "./Services/FSServices";

function App() {
  const [userData, setUserData] = useState("");
  const [display, setDisplay] = useState("");

  useEffect(() => {
    async function getData() {
      await FSServices.fetchUserData().then((data) => {
        setUserData(data);
      });
    }
    getData();
  }, []);

  return (
    <div className="App">
      <Header setDisplay={setDisplay} setUserId={setUserData} />
      {userData ? (
        <Dashboard
          store={userData.store}
          userId={userData.id}
          favorites={userData.favorites}
        />
      ) : null}

      {/* 
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
