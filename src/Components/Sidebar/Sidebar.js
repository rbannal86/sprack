import React, { useState } from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
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
      {props.filterLowSpices ? (
        <button onClick={() => props.handleFilterLowSpices()}>
          Show All Spices
        </button>
      ) : (
        <button onClick={() => props.handleFilterLowSpices()}>
          Show Only Low Spices
        </button>
      )}
      <button onClick={() => props.handleFilterFavorites()}>Favorites</button>
    </div>
  );
}
