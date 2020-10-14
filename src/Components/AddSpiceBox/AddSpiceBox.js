import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./AddSpiceBox.css";

export default function AddSpiceBox(props) {
  return (
    <div className={"add_spice_box"} onClick={() => props.handleOpenAddSpice()}>
      <AddCircleOutlineIcon />
    </div>
  );
}
