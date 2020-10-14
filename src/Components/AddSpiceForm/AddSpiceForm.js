import React, { useState } from "react";
import Box from "../Box/Box";
import "./AddSpiceForm.css";

export default function AddSpiceForm(props) {
  const [level, setLevel] = useState(0);
  const [spiceName, setSpiceName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAddSpice(spiceName, level);
    props.handleOpenAddSpice();
  };

  return (
    <form
      className={"add_spice_form"}
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
      <button onClick={() => props.handleOpenAddSpice()}>Cancel</button>
    </form>
  );
}
