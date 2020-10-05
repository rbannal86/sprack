import React from "react";
import "./Segment.css";

export default function Segment(props) {
  return (
    <div
      className={"segment_main " + props.status}
      id={props.stack}
      onClick={() => {
        props.setUnlocked(true);
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
