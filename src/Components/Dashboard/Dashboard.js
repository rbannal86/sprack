import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import STORE from "../../Services/STORE";
import Box from "../Box/Box";
import AddSpiceBox from "../AddSpiceBox/AddSpiceBox";
import AddSpiceForm from "../AddSpiceForm/AddSpiceForm";
import Sidebar from "../Sidebar/Sidebar";
import PopUpNameEdit from "../PopUpNameEdit/PopUpNameEdit";
import "./Dashboard.css";

export default function Dashboard2() {
  const [showAddSpice, setAddShowSpice] = useState(false);
  const [filterLowSpices, setFilterLowSpices] = useState(false);
  const [editSpiceName, setEditSpiceName] = useState(false);
  const [store, setStore] = useState(STORE);
  const [storeUpdated, setStoreUpdated] = useState(false);
  const [nameToEdit, setNameToEdit] = useState(null);

  let newSpiceNames = {};
  let newSpiceLevels = {};

  const handleSpiceLevelChange = (spice, level) => {
    newSpiceLevels[spice] = 11 - level;
  };

  const handleSaveSpiceChanges = () => {
    Object.keys(newSpiceLevels).forEach((spice) => {
      Object.assign(STORE, { [spice]: newSpiceLevels[spice] });
    });
    setStore(STORE);
    setStoreUpdated(true);
    newSpiceLevels = {};
  };

  const handleFilterLowSpices = () => {
    setFilterLowSpices(!filterLowSpices);
  };

  const handleOpenAddSpice = () => {
    setAddShowSpice(!showAddSpice);
  };

  const handleEditSpiceSubmit = (name) => {
    if (name.length === 0) delete STORE[nameToEdit];
    else delete Object.assign(STORE, { [name]: STORE[nameToEdit] })[nameToEdit];
    setNameToEdit(null);
  };

  const handleEditSpiceName = () => {
    if (editSpiceName) {
      handleNameUpdate(nameToEdit);
      setNameToEdit(null);
    }
    setEditSpiceName(!editSpiceName);
  };

  const handleNameUpdate = (originalName, newName) => {
    let updatedSpiceName = newSpiceNames;
    updatedSpiceName[originalName] = newName;
    newSpiceNames = updatedSpiceName;
  };

  const renderSpices = () => {
    if (storeUpdated) setStoreUpdated(false);
    let sortedKeys = Object.keys(store).sort();

    return sortedKeys.map((spice, index) => {
      if (!filterLowSpices || store[spice] <= 2)
        return (
          <div
            className={"spice_individual"}
            key={spice + index + store[spice]}
          >
            <div
              className={"spice_header"}
              data-tip={spice}
              onClick={() => {
                if (editSpiceName) setNameToEdit(spice);
              }}
            >
              {spice}
            </div>

            <Box
              level={10 - store[spice]}
              handleSpiceLevelChange={handleSpiceLevelChange}
              spiceName={spice}
            />
          </div>
        );
      else return null;
    });
  };

  return (
    <div>
      <ReactTooltip />
      <Sidebar
        handleSaveSpiceChanges={handleSaveSpiceChanges}
        handleFilterLowSpices={handleFilterLowSpices}
        handleEditSpiceName={handleEditSpiceName}
        filterLowSpices={filterLowSpices}
        editSpiceName={editSpiceName}
      />
      {nameToEdit ? (
        <PopUpNameEdit
          spiceName={nameToEdit}
          handleEditSpiceSubmit={handleEditSpiceSubmit}
        />
      ) : null}
      {showAddSpice ? (
        <AddSpiceForm handleOpenAddSpice={handleOpenAddSpice} />
      ) : null}
      <div className={"spice_main"}>
        {renderSpices()}
        <div className={"spice_individual"}>
          <div className={"spice_header"}></div>{" "}
          <AddSpiceBox
            handleOpenAddSpice={handleOpenAddSpice}
            filterLowSpices={filterLowSpices}
          />
        </div>
      </div>
    </div>
  );
}
