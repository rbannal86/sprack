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

  console.log(props.userName);

  return (
    <div className="header_div">
      <h2>{slogan}</h2>
      {!props.userName ? (
        <>
          <button onClick={() => props.setDisplay("register")}>Register</button>
          <button onClick={() => props.setDisplay("login")}>Log In</button>
        </>
      ) : null}
      {props.userName ? (
        <button onClick={() => props.setUserId("")}>Log Out</button>
      ) : null}
    </div>
  );
};

export default Header;
