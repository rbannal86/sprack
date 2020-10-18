import React, { useState } from "react";
import Form from "../../Forms/Form";
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

  //Disables the submit button in order to prevent double clicking messing up the registration input. If an error arises
  //(mismatched password/password doesn't match regex), button reenables. If everything passes the checks, calls
  //the register function from the service file, creates a new user in the service file with preloaded spices, then
  //returns that user's data and sets it in the parent component. Nulls out the display to unrender the register form
  //and allows the dashboard to render.
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
    if (userId.code === "auth/email-already-in-use") {
      setError("Email already in use!");
      document.getElementById("register_submit_button").disabled = false;
    } else {
      console.log(userId);
      props.setUserData(userId);
      props.setDisplay(null);
    }
  };

  //Switch is used here to cut down on lines for this controlled React form.
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
        console.log("confirm");
        setConfirmPassword(e.target.value);
        break;
      case "user_name":
        setUserName(e.target.value);
        break;
      default:
        break;
    }
  };

  //Generic Form component is called here.
  return (
    <Form
      submit={submitRegistration}
      buttonLabel={"Register"}
      buttonId={"register_submit_button"}
      error={error}
      fields={[
        {
          label: "Email: ",
          id: "user_email",
          placeholder: "youremail@email.com",
          type: "email",
          onChange: setInputState,
          name: "user_email",
          value: email,
        },
        {
          label: "Username: ",
          id: "user_name",
          placeholder: "Bill Q. Spiceman",
          type: "text",
          onChange: setInputState,
          name: "user_name",
          value: userName,
        },
        {
          label: "Password: ",
          id: "user_password",
          placeholder: "password...",
          type: "password",
          onChange: setInputState,
          name: "user_password",
          value: password,
        },
        {
          label: "Confirm Password: ",
          id: "user_password_comfirm",
          placeholder: "password...",
          type: "password",
          onChange: setInputState,
          name: "user_password_confirm",
          value: confirmPassword,
        },
      ]}
    />
  );
};

export default UserRegister;
