import React from "react";

export default function FilterOptions(props) {
  return (
    <div>
      <div onClick={() => props.lowSpice()}>Low Spice</div>
      <div onClick={() => props.favorites()}>Favorites</div>
    </div>
  );
}
