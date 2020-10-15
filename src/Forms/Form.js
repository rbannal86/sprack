import React, { useEffect } from "react";
import "./Form.css";

export default function Form(props) {
  useEffect(() => {
    let element = document.getElementById("form_top");
    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  const renderInput = () => {
    return props.fields.map((field, index) => {
      if(field.type === "textarea") {
        return         <div key={index}>
        <label className={"form_label"}>
          <h3 className={"form_title"}>{field.label}</h3>
        </label>
        <textarea
          className={"form_input"}
          id={field.id}
          type={field.type}
          name={field.name}
          value={field.value}
          onChange={(e) => field.onChange(e)}
          placeholder={field.placeholder}
        />
      </div>
      }
      else return (
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
    <form
      className={"form_main"}
      id={"form_top"}
      onSubmit={(e) => props.submit(e)}
    >
      <div className="form_error">{props.error}</div>
      {renderInput()}
      <button className={"form_button"} id={props.buttonId}>
        {props.buttonLabel}
      </button>
      <div id={"form_bottom"} />
    </form>
  );
}
