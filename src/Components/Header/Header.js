import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header_div">
      <h1>sprack</h1>

      <div className={"header_buttons"}>
        <button onClick={() => props.setDisplay("register")}>Register</button>
        <button onClick={() => props.setDisplay("login")}>Log In</button>
      </div>

      <button onClick={() => props.setUserId("")}>Log Out</button>
    </div>
  );
};

export default Header;
