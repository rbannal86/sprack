import React, { useState } from "react";
import FSServices from "../../Services/FSServices";
import "./UserLogin.css";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    const login = await FSServices.signInUser(email, password);
    if (login.message) setError(login.message);
    else {
      let userData = await FSServices.fetchUserData(login);
      props.setUserData(userData);
      props.setDisplay(null);
    }
  };

  const setInputState = (e) => {
    if (error) setError("");
    switch (e.target.id) {
      case "user_email_login":
        setEmail(e.target.value);
        break;
      case "user_password_login":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={"login_main"}>
      <h2 className={"login_title"}>LOGIN</h2>
      <form onSubmit={(e) => submitLogin(e)} className={"login_form"}>
        <label htmlFor="user_email_login">
          <h3 className={"login_label"}>Account Email: </h3>
        </label>
        <input
          className="login_input"
          id="user_email_login"
          type="email"
          placeholder="youremail@email.com"
          name="user_email_login"
          value={email}
          onChange={(e) => setInputState(e)}
        />
        <label htmlFor="user_password_login">
          <h3 className={"login_label"}>Password: </h3>
        </label>
        <input
          className="login_input"
          id="user_password_login"
          type="password"
          placeholder="password..."
          name="user_password_login"
          onChange={(e) => setInputState(e)}
        />
        <button className={"login_button"}>Log In</button>
      </form>
      <div className="login_error">{error}</div>
    </div>
  );
};

export default UserLogin;
