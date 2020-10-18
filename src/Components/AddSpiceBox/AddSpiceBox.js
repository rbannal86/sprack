import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./AddSpiceBox.css";

export default function AddSpiceBox(props) {
  //Populates an empty Box component in the dashboard with a button
  //that opens the add spice form.
  return (
    <div className={"add_spice_box"} onClick={() => props.handleOpenAddSpice()}>
      <AddCircleOutlineIcon />
    </div>
  );
}
