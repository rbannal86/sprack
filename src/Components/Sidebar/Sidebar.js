import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import FilterOptions from "../FilterOptions/FilterOptions";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [filter, setFilter] = useState(false);
  const [spiceLevelChanged, setSpiceLevelChanged] = useState("");
  const [toggleEditSpice, setToggleEditSpice] = useState("");
  const [filterOpen, setFilterOpen] = useState("");

  if (props.editSpiceName && toggleEditSpice === "") setToggleEditSpice("yes");
  else if (!props.editSpiceName && toggleEditSpice === "yes")
    setToggleEditSpice("");

  if (props.spiceLevelChanged && spiceLevelChanged === "")
    setSpiceLevelChanged("yes");
  else if (!props.spiceLevelChanged && spiceLevelChanged === "yes")
    setSpiceLevelChanged("");

  if (filter && filterOpen === "") setFilterOpen("yes");
  else if (!filter && filterOpen === "yes") setFilterOpen("");

  return (
    <div className={"sidebar"}>
      <button
        data-tip={"Save Changes"}
        className={"sidebar_button " + spiceLevelChanged}
        onClick={() => props.handleSaveSpiceChanges()}
        aria-label={"Save Level Changes"}
        aria-hidden={"false"}
      >
        <SaveAltIcon aria-label={"Save Level Changes"} aria-hidden={"false"} />
      </button>
      <button
        data-tip={"Edit Spice Names or Delete Spice"}
        className={"sidebar_button " + toggleEditSpice}
        onClick={() => props.handleEditSpiceName()}
      >
        <EditIcon aria-label={"Toggle Edit Mode"} aria-hidden={"false"} />
      </button>
      <button
        data-tip={"Filter Options"}
        className={"sidebar_button " + filterOpen}
        onClick={() => setFilter(!filter)}
      >
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
