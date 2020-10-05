import React, { useState } from "react";
import Box from "../Box/Box";
import STORE from "../../Services/STORE";

export default function AddSpiceForm(props) {
  const [level, setLevel] = useState(0);
  const [spiceName, setSpiceName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    STORE[spiceName] = level;
    props.handleOpenAddSpice();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        onChange={(e) => {
          setSpiceName(e.target.value);
        }}
        placeholder={"Enter Spice Name"}
        type={"text"}
        required
      />
      <Box level={10} setLevel={setLevel} />
      <button type={"submit"}>Submit</button>
    </form>
  );
}
