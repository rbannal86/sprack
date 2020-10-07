import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import FSServices from "./Services/FSServices";

function App() {
  const [userData, setUserData] = useState(null);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (userData) {
      async function getData() {
        await FSServices.fetchUserData(userData.id).then((data) => {
          setUserData(data);
        });
      }
      getData();
    }
  }, [userData]);

  return (
    <div className="App">
      <Header
        userData={userData}
        setUserData={setUserData}
        setDisplay={setDisplay}
      />
      {userData ? (
        <Dashboard
          store={userData.store}
          userId={userData.id}
          favorites={userData.favorites}
        />
      ) : null}

      {display === "register" ? (
        <UserRegister setUserData={setUserData} setDisplay={setDisplay} />
      ) : null}
      {display === "login" ? (
        <UserLogin setUserData={setUserData} setDisplay={setDisplay} />
      ) : null}
    </div>
  );
}

export default App;
