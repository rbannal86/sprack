import React, { useState } from "react";
import "./FilterOptions.css";

export default function FilterOptions(props) {
  const [lowSpices, setLowSpices] = useState("");
  const [favorites, setFavorites] = useState("");

  return (
    <ul className={"filter_option_list"}>
      <li
        className={"filter_option " + lowSpices}
        onClick={() => {
          lowSpices === "checked" ? setLowSpices("") : setLowSpices("checked");
          props.lowSpice();
        }}
      >
        Low Spices
      </li>
      <li
        className={"filter_option " + favorites}
        onClick={() => {
          favorites === "checked" ? setFavorites("") : setFavorites("checked");
          props.favorites();
        }}
      >
        Favorites
      </li>
    </ul>
  );
}
