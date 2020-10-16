import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import UserRegister from "./Components/UserRegister/UserRegister";
import UserLogin from "./Components/UserLogin/UserLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import Tutorial from "./Components/Tutorial/Tutorial";
import FSServices from "./Services/FSServices";

function App() {
  const [userData, setUserData] = useState(null);
  const [display, setDisplay] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const resetSample = async () => {
    FSServices.resetSample();
  };

  const checkLogin = async () => {
    if (localStorage.sprackId !== null)
      setUserData(await FSServices.fetchUserData(localStorage.sprackId));
  };

  useEffect(() => {
    if (localStorage.sprackId === "v40DelcKHFR6qh9mEyMCxNPYsfM2")
      localStorage.setItem("sprackId", null);
    else checkLogin();
  }, []);

  const handleLogOut = () => {
    if (userData.id === "v40DelcKHFR6qh9mEyMCxNPYsfM2") resetSample();
    localStorage.setItem("sprackId", null);
    setDisplay("");
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

  useEffect(() => {
    FSServices.resetSample();
  }, []);

  const logInSample = async (e) => {
    e.preventDefault();
    const login = await FSServices.signInUser(
      "sample@sprack.com",
      "Password1!"
    );
    if (!login.message) {
      let newUserData = await FSServices.fetchUserData(login);
      setUserData(newUserData);
      setDisplay(null);
    }
  };

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
      {display === "tutorial" ? <Tutorial setDisplay={setDisplay} /> : null}
      {display === "" && !userData ? (
        <div id={"app_button_div"}>
          <button
            className={"tutorial_button"}
            onClick={() => {
              setDisplay("tutorial");
            }}
          >
            A Quick Tour
          </button>
          <button
            className={"tutorial_button"}
            onClick={(e) => {
              logInSample(e);
            }}
          >
            Sample Spice Rack
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
