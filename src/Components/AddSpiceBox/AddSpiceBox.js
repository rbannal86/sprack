import React from "react";
import "./AddSpiceBox.css";

export default function AddSpiceBox(props) {
  return (
    <div className={"add_spice_box"} onClick={() => props.handleOpenAddSpice()}>
      +
    </div>
  );
}
