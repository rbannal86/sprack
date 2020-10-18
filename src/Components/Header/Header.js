import React from "react";
import "./Header.css";

const Header = (props) => {
  //Standard header. Each button calls the appropriate state function from the parent in order to
  //conditionally render the correct component. If userData is present in the parent component,
  //a Log Out button in displayed, otherwise a register button and a log in button are present.
  return (
    <div className="header_div">
      <div className={"header_title_div"}>
        <h1 className={"header_title"} onClick={() => props.setDisplay("")}>
          sprack
        </h1>
        <h2 className={"header_subtitle"}>Your digital spice rack</h2>
      </div>

      {props.userData ? (
        <button
          className={"header_button logout_button"}
          onClick={() => props.setUserData(null)}
        >
          Log Out
        </button>
      ) : (
        <div className={"header_buttons"}>
          <button
            className={"header_button"}
            onClick={() => props.setDisplay("register")}
          >
            Register
          </button>
          <button
            className={"header_button"}
            onClick={() => props.setDisplay("login")}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
