import React, { useState } from "react";
import FSServices from "../../Services/FSServices";
import "./UserRegister.css";

const UserRegister = (props) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  let passRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const submitRegistration = async (e) => {
    document.getElementById("register_submit_button").disabled = true;
    e.preventDefault();
    if (!passRegex.test(password)) {
      document.getElementById("register_submit_button").disabled = false;
      return setError(
        "Password must be eight characters or longer and contain at least 1 lowercase, 1 uppercase, 1 numeric, and one special character. We take your spice rack security very seriously!"
      );
    }
    if (password !== confirmPassword) {
      document.getElementById("register_submit_button").disabled = false;
      return setError("Passwords Do Not Match");
    }
    let userId = await FSServices.registerNewUser(email, password, userName);
    console.log(userId);
    props.setUserData(userId);
    props.setDisplay(null);
  };

  const setInputState = (e) => {
    if (error) setError("");
    switch (e.target.id) {
      case "user_email":
        setEmail(e.target.value);
        break;
      case "user_password":
        setPassword(e.target.value);
        break;
      case "user_password_comfirm":
        setConfirmPassword(e.target.value);
        break;
      case "user_name":
        setUserName(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={"register_main"}>
      <h2 className={"register_title"}>REGISTER</h2>
      <form onSubmit={(e) => submitRegistration(e)} className={"register_form"}>
        <label htmlFor="user_email">
          <h3 className={"register_label"}>Email: </h3>
        </label>
        <input
          className={"register_input"}
          id="user_email"
          type="email"
          placeholder="youremail@email.com"
          name="user_email"
          value={email}
          onChange={(e) => setInputState(e)}
        ></input>
        <label htmlFor="user_name">
          <h3 className={"register_label"}>Username: </h3>
        </label>
        <input
          className={"register_input"}
          id="user_name"
          type="text"
          placeholder="Bill Q. Spiceman"
          value={userName}
          onChange={(e) => setInputState(e)}
        />
        <label htmlFor="user_password">
          <h3 className={"register_label"}>Password: </h3>
        </label>
        <input
          className={"register_input"}
          id="user_password"
          type="password"
          placeholder="password..."
          name="user_password"
          onChange={(e) => setInputState(e)}
        ></input>
        <label htmlFor="user_password_confirm">
          <h3 className={"register_label"}>Confirm Password: </h3>
        </label>
        <input
          className={"register_input"}
          id="user_password_comfirm"
          type="password"
          placeholder="password..."
          name="user_password_confirm"
          onChange={(e) => setInputState(e)}
        />

        <button
          type={"submit"}
          id={"register_submit_button"}
          className={"register_button"}
        >
          Register
        </button>
      </form>
      {error ? <div className={"register_error"}>{error}</div> : null}
    </div>
  );
};

export default UserRegister;
