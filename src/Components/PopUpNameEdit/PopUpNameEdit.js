import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./PopUpNameEdit.css";

export default function PopUpNameEdit(props) {
  const [input, setInput] = useState(props.spiceName);

  //renders a form that allows the user to either rename the spice
  //or delete the spice.
  return (
    <div className={"popup_form"}>
      <form className={"name_edit_form"}>
        <div className={"name_edit_div"}>
          <h5 className={"name_edit_label"}>Edit Spice Name</h5>
          <input
            value={input}
            className={"name_edit_input"}
            required
            placeholder={props.spiceName}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <button
            data-tip={"Submit Name Change"}
            className={"name_edit_button"}
            onClick={(e) => {
              e.preventDefault();
              ReactTooltip.hide();
              if (input.length > 0) props.handleEditSpiceSubmit(input);
            }}
          >
            <SaveAltIcon />
          </button>
        </div>
        <div className={"name_edit_div"}>
          <h5 className={"name_edit_label"}>Delete Spice</h5>

          <button
            data-tip={"Delete Spice"}
            className={"name_edit_button"}
            onClick={(e) => {
              e.preventDefault();
              props.handleEditSpiceSubmit("");
            }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
