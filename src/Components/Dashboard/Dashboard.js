import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Box from "../Box/Box";
import AddSpiceBox from "../AddSpiceBox/AddSpiceBox";
import AddSpiceForm from "../AddSpiceForm/AddSpiceForm";
import Sidebar from "../Sidebar/Sidebar";
import PopUpNameEdit from "../PopUpNameEdit/PopUpNameEdit";
import FSServices from "../../Services/FSServices";
import "./Dashboard.css";

export default function Dashboard2(props) {
  const [showAddSpice, setAddShowSpice] = useState(false);
  const [filterLowSpices, setFilterLowSpices] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [editSpiceName, setEditSpiceName] = useState(false);
  const [store, setStore] = useState(props.store);
  const [storeUpdated, setStoreUpdated] = useState(false);
  const [nameToEdit, setNameToEdit] = useState(null);
  const [favorites, setFavorites] = useState(props.favorites);

  let newSpiceNames = {};
  let newSpiceLevels = {};

  const handleAddSpice = (spice, level) => {
    let updatedStore = store;
    updatedStore[spice] = level;
    setStore(updatedStore);
    FSServices.updateStore(store, props.userId);
  };

  const handleSpiceLevelChange = (spice, level) => {
    newSpiceLevels[spice] = 11 - level;
  };

  const handleFavorites = (spice) => {
    let newFavorites = favorites;
    if (newFavorites.includes(spice)) {
      newFavorites = newFavorites.filter((item) => item !== spice);
      setFavorites(newFavorites);
    } else {
      newFavorites.push(spice);
      setFavorites(newFavorites);
    }
    FSServices.updateFavorites(newFavorites, props.userId);
  };

  const handleSaveSpiceChanges = () => {
    let updatedStore = store;

    Object.keys(newSpiceLevels).forEach((spice) => {
      Object.assign(updatedStore, { [spice]: newSpiceLevels[spice] });
    });
    setStore(updatedStore);
    setStoreUpdated(true);
    FSServices.updateStore(store, props.userId);
    newSpiceLevels = {};
  };

  const handleFilterLowSpices = () => {
    setFilterLowSpices(!filterLowSpices);
  };

  const handleFilterFavorites = () => {
    setFilterFavorites(!filterFavorites);
  };

  const handleOpenAddSpice = () => {
    setAddShowSpice(!showAddSpice);
  };

  const handleEditSpiceSubmit = (name) => {
    if (favorites.includes(nameToEdit)) {
      let updatedFavorites = favorites.filter((spice) => spice !== nameToEdit);
      if (name.length !== 0) updatedFavorites.push(name);
      FSServices.updateFavorites(updatedFavorites, props.userId);
      setFavorites(updatedFavorites);
    }
    let updatedStore = store;
    if (name.length === 0) delete updatedStore[nameToEdit];
    else {
      delete Object.assign(updatedStore, { [name]: updatedStore[nameToEdit] })[
        nameToEdit
      ];
    }
    setStore(updatedStore);
    setNameToEdit(null);
    FSServices.updateStore(store, props.userId);
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
    let sortedKeys = [];
    if (store) sortedKeys = Object.keys(store).sort();

    return sortedKeys.map((spice, index) => {
      if (!filterLowSpices || store[spice] <= 2)
        if (!filterFavorites || favorites.includes(spice))
          return (
            <div
              className={"spice_individual"}
              key={spice + index + store[spice]}
            >
              <div className={"spice_header_info"}>
                <button
                  className={"spice_header_favorite"}
                  onClick={() => handleFavorites(spice)}
                >
                  F
                </button>
                <div
                  className={"spice_header"}
                  data-tip={spice}
                  onClick={() => {
                    if (editSpiceName) setNameToEdit(spice);
                  }}
                >
                  {spice}
                </div>
              </div>

              <Box
                level={10 - store[spice]}
                handleSpiceLevelChange={handleSpiceLevelChange}
                spiceName={spice}
              />
            </div>
          );
        else return null;
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
        handleFilterFavorites={handleFilterFavorites}
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
        <AddSpiceForm
          handleOpenAddSpice={handleOpenAddSpice}
          handleAddSpice={handleAddSpice}
        />
      ) : null}
      <div className={"spice_main"}>
        {renderSpices()}
        <div className={"spice_individual"}>
          <div className={"spice_header"}>Add Spice</div>
          <AddSpiceBox
            handleOpenAddSpice={handleOpenAddSpice}
            filterLowSpices={filterLowSpices}
          />
        </div>
      </div>
    </div>
  );
}
