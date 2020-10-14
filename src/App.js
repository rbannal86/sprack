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
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogOut = () => {
    setLoggingOut(true);
    setUserData(null);
  };

  useEffect(() => {
    async function getData() {
      await FSServices.fetchUserData(userData.id).then((data) => {
        setUserData(data);
      });
    }
    if (userData && loggingOut) {
      getData();
    }
    if (!userData && loggingOut) {
      setLoggingOut(false);
    }
  }, [userData, loggingOut]);

  return (
    <div className="App">
      <Header
        userData={userData}
        setUserData={handleLogOut}
        setDisplay={setDisplay}
      />
      {userData ? (
        <Dashboard
          store={userData.store}
          userId={userData.id}
          favorites={userData.favorites}
          displayName={userData.displayName}
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
