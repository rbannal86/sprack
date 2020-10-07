import React, { useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [filter, setFilter] = useState(false);
  return (
    <div className={"sidebar"}>
      <button onClick={() => props.handleSaveSpiceChanges()}>
        Submit Changes
      </button>
      {props.editSpiceName ? (
        <button onClick={() => props.handleEditSpiceName()}>
          Save Changes to Spice Names
        </button>
      ) : (
        <button onClick={() => props.handleEditSpiceName()}>
          Edit Spice Names
        </button>
      )}
      <button onClick={() => setFilter(!filter)}>Filter</button>
      {filter ? (
        <FilterOptions
          lowSpice={props.handleFilterLowSpices}
          favorites={props.handleFilterFavorites}
        />
      ) : null}
      {/* {props.filterLowSpices ? (
        <button onClick={() => props.handleFilterLowSpices()}>
          Show All Spices
        </button>
      ) : (
        <button onClick={() => props.handleFilterLowSpices()}>
          Show Only Low Spices
        </button>
      )} */}
      {/* <button onClick={() => props.handleFilterFavorites()}>Favorites</button> */}
    </div>
  );
}
