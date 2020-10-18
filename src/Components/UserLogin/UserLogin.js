import React, { useState } from "react";
import FSServices from "../../Services/FSServices";
import Form from "../../Forms/Form";
// import "./UserLogin.css";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Calls the sign in function from the service file. If that succeeds, calls the user data fetch function
  //from the service file and sets the user data in the parent component and nulls out the display state,
  //which unrenders the log in component and clears the page for the dashboard component.
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

  //Allows for controlled input for the form. Standard React form stuff.
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

  //Generic Form component is called in the render.
  return (
    <Form
      submit={submitLogin}
      buttonLabel={"Log In"}
      error={error}
      fields={[
        {
          label: "Account Email: ",
          id: "user_email_login",
          placeholder: "youremail@email.com",
          type: "email",
          onChange: setInputState,
          name: "user_email_login",
          value: email,
        },
        {
          label: "Password: ",
          id: "user_password_login",
          placeholder: "password...",
          type: "password",
          onChange: setInputState,
          name: "user_password_login",
          value: password,
        },
      ]}
    />
  );
};

export default UserLogin;
