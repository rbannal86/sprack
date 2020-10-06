import React, { useState } from "react";
import "./PopUpNameEdit.css";

export default function PopUpNameEdit(props) {
  const [input, setInput] = useState("");

  return (
    <div className={"popup_form"}>
      <form>
        <input
          required
          placeholder={props.spiceName}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (input.length > 0) props.handleEditSpiceSubmit(input);
          }}
        >
          Change Name
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleEditSpiceSubmit("");
          }}
        >
          Delete Item
        </button>
      </form>
    </div>
  );
}
