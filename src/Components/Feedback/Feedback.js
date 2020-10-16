import React, { useState } from "react";
import Form from "../../Forms/Form";
import FSServices from "../../Services/FSServices";
import "./Feedback.css";

export default function Feedback(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user] = useState(props.userId);
  const [error, setError] = useState(null);

  const submitFeedback = (e) => {
    e.preventDefault();
    props.showFeedback(false);
    FSServices.submitFeedback(title, body, user);
  };

  const setInputState = (e) => {
    if (error) setError("");
    switch (e.target.id) {
      case "feedback_subject":
        setTitle(e.target.value);
        break;
      case "feedback_body":
        setBody(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Form
      submit={submitFeedback}
      error={error}
      buttonLabel={"Submit"}
      buttonId={"feedback_submit_button"}
      fields={[
        {
          label: "Subject: ",
          id: "feedback_subject",
          placeholder: "Issue/Suggestion/Bug",
          type: "text",
          onChange: setInputState,
          name: "feedback_subject",
          value: title,
        },
        {
          label: "",
          id: "feedback_body",
          placeholder: "...",
          type: "textarea",
          onChange: setInputState,
          name: "feedback_body",
          value: body,
        },
      ]}
    />
  );
}
