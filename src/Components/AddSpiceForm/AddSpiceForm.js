import React, { useState } from "react";
import Box from "../Box/Box";
import ClearIcon from "@material-ui/icons/Clear";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import "./AddSpiceForm.css";

export default function AddSpiceForm(props) {
  const [level, setLevel] = useState(0);
  const [spiceName, setSpiceName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(props.store).includes(spiceName))
      props.setError("This spice has already been registered!");
    else {
      props.handleAddSpice(spiceName, level);
      props.handleOpenAddSpice();
    }
  };

  return (
    <form
      className={"add_spice_form"}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <input
        onChange={(e) => {
          setSpiceName(e.target.value);
          props.setError(null);
        }}
        placeholder={"Enter Spice Name"}
        type={"text"}
        required
      />
      <Box level={10} setLevel={setLevel} />
      <div className={"add_spice_form_button_div"}>
        <button className={"add_spice_form_button"} type={"submit"}>
          <SaveAltIcon />
        </button>
        <button
          className={"add_spice_form_button"}
          onClick={(e) => {
            e.preventDefault();
            props.setError(null);
            props.handleOpenAddSpice();
          }}
        >
          <ClearIcon />
        </button>
      </div>
    </form>
  );
}
