import React, { useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [filter, setFilter] = useState(false);
  return (
    <div className={"sidebar"}>
      <button
        className={"sidebar_button"}
        onClick={() => props.handleSaveSpiceChanges()}
        aria-label={"Save Level Changes"}
        aria-hidden={"false"}
      >
        <SaveAltIcon aria-label={"Save Level Changes"} aria-hidden={"false"} />
      </button>
      {props.editSpiceName ? (
        <button
          className={"sidebar_button"}
          onClick={() => props.handleEditSpiceName()}
        >
          <EditIcon
            color={"secondary"}
            aria-label={"Toggle Edit Mode"}
            aria-hidden={"false"}
          />
        </button>
      ) : (
        <button
          className={"sidebar_button"}
          onClick={() => props.handleEditSpiceName()}
        >
          <EditIcon aria-label={"Toggle Edit Mode"} aria-hidden={"false"} />
        </button>
      )}
      <button className={"sidebar_button"} onClick={() => setFilter(!filter)}>
        <FilterListIcon aria-label={"Filter Options"} aria-hidden={"false"} />
      </button>
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
