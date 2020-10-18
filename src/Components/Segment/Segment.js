import React from "react";
import "./Segment.css";

export default function Segment(props) {
  //The render for each separate segment in a spice Box. Has separate onEvents for use on desktop and mobile.
  //document.elementFromPoint is a workaround for the onTouch creation of a touch point and works
  //based off of that original touch point creation. onClick also "unlocks" the box to avoid
  //overly-sensitive level selection.
  return (
    <div
      className={"segment_main " + props.status}
      id={props.stack}
      onClick={() => {
        props.setUnlocked(!props.unlocked);
        props.setSelected(props.stack);
      }}
      onMouseEnter={() => {
        if (props.unlocked) {
          props.setSelected(props.stack);
        }
      }}
      onTouchStart={() => {
        props.setSelected(props.stack);
      }}
      onTouchMove={(e) => {
        if (
          document.elementFromPoint(
            e.touches[0].clientX,
            e.touches[0].clientY
          ) &&
          document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
            .id
        )
          props.setSelected(
            parseInt(
              document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
              ).id
            )
          );
      }}
    ></div>
  );
}
