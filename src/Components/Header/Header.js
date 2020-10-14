import React from "react";
import "./Header.css";

const Header = (props) => {
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
          className={"header_button"}
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
