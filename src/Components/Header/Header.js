import React, { useState, useEffect } from "react";

const Header = props => {
  const [slogan, setSlogan] = useState("");

  useEffect(() => {
    const headerSlogans = [
      "Spice is the variety of life",
      "Thyme to spice things up",
      "Spice: The Final Frontier",
      "Sage Advice: Add Some Spice",
      "Sugar, Spice, and Everything Nice"
    ];
    let index = Math.floor(Math.random() * headerSlogans.length);
    console.log(index);
    setSlogan(headerSlogans[index]);
  }, [props]);

  return (
    <div className="header_div">
      {props.userName ? <h1>Welcome, {props.userName}!</h1> : <></>}
      <h2>{slogan}</h2>
      <button>Register</button>
      <button>Log In</button>
    </div>
  );
};

export default Header;
