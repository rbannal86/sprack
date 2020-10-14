import React, { useState, useEffect } from "react";
import Segment from "../Segment/Segment";
import "./Box.css";

export default function Box(props) {
  const [originalSelected] = useState(props.level + 1);
  const [selected, setSelected] = useState(props.level + 1);
  const [unlocked, setUnlocked] = useState(false);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (props.setLevel) props.setLevel(11 - selected);
  }, [props, selected]);

  if (originalSelected !== selected && changedStatus === "") {
    setChangedStatus("changed");
  }

  if (originalSelected === selected && changedStatus === "changed") {
    props.handleNoChanges(props.spiceName);
    setChangedStatus("");
  }

  if (selected !== originalSelected && props.handleSpiceLevelChange) {
    props.handleSpiceLevelChange(props.spiceName, selected);
  }

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
