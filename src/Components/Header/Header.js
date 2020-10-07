import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header_div">
      <h1>sprack</h1>
      {props.userData ? (
        <button onClick={() => props.setUserData(null)}>Log Out</button>
      ) : (
        <div className={"header_buttons"}>
          <button onClick={() => props.setDisplay("register")}>Register</button>
          <button onClick={() => props.setDisplay("login")}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default Header;
