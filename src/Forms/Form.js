import React from "react";
import "./Form.css";

export default function Form(props) {
  const renderInput = () => {
    return props.fields.map((field, index) => {
      return (
        <div key={index}>
          <label className={"form_label"}>
            <h3 className={"form_title"}>{field.label}</h3>
          </label>
          <input
            className={"form_input"}
            id={field.id}
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={(e) => field.onChange(e)}
            placeholder={field.placeholder}
          />
        </div>
      );
    });
  };

  return (
    <form className={"form_main"} onSubmit={(e) => props.submit(e)}>
      <div className="form_error">{props.error}</div>
      {renderInput()}
      <button className={"form_button"} id={props.buttonId}>
        {props.buttonLabel}
      </button>
    </form>
  );
}
