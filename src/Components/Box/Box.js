import React, { useState, useEffect } from "react";
import Segment from "../Segment/Segment";
import "./Box.css";

export default function Box(props) {
  const [originalSelected] = useState(props.level + 1);
  const [selected, setSelected] = useState(props.level + 1);
  const [unlocked, setUnlocked] = useState(false);
  const [changedStatus, setChangedStatus] = useState("");

  //updates level for spice in parent if a user clicks on a different level
  useEffect(() => {
    if (props.setLevel) props.setLevel(11 - selected);
  }, [props, selected]);

  //sets the changedStatus if the new level is not equal to the original level
  //which will trigger a change in the border color
  if (originalSelected !== selected && changedStatus === "") {
    setChangedStatus("changed");
  }

  //resets the changed status if the level gets changed back to the original
  //level. This also calls the setChangedStatus function which will
  //determine if there are no more changes that have been made and
  //toggle the save changes button
  if (originalSelected === selected && changedStatus === "changed") {
    props.handleNoChanges(props.spiceName);
    setChangedStatus("");
  }

  //prepares the updated spice levels variable in the parent component
  //when the user changes the spice level
  if (selected !== originalSelected && props.handleSpiceLevelChange) {
    props.handleSpiceLevelChange(props.spiceName, selected);
  }

  //renders the ten separate segments, with the current level rendered
  //with a different className.
  const renderSegments = () => {
    let renderArray = [];
    for (let i = 1; i < 11; i++) {
      let status = "inactive";
      if (selected && i >= selected) status = "active";
      if (selected === i) status = "top";
      renderArray.push(
        <Segment
          key={i}
          stack={i}
          setSelected={setSelected}
          status={status}
          setUnlocked={setUnlocked}
          unlocked={unlocked}
        />
      );
    }
    return renderArray;
  };

  return (
    <div
      className={"box_main " + changedStatus}
      onMouseLeave={() => setUnlocked(false)}
    >
      {renderSegments()}
    </div>
  );
}
