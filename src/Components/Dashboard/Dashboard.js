import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Box from "../Box/Box";
import AddSpiceBox from "../AddSpiceBox/AddSpiceBox";
import AddSpiceForm from "../AddSpiceForm/AddSpiceForm";
import Sidebar from "../Sidebar/Sidebar";
import PopUpNameEdit from "../PopUpNameEdit/PopUpNameEdit";
import FSServices from "../../Services/FSServices";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./Dashboard.css";

export default function Dashboard2(props) {
  const [showAddSpice, setAddShowSpice] = useState(false);
  const [filterLowSpices, setFilterLowSpices] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [editSpiceName, setEditSpiceName] = useState(false);
  const [store, setStore] = useState(props.store);
  const [storeUpdated, setStoreUpdated] = useState(false);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const [nameToEdit, setNameToEdit] = useState(null);
  const [favorites, setFavorites] = useState(props.favorites);
  const [spiceLevelChanged, setSpiceLevelChanged] = useState(false);
  const [error, setError] = useState(null);

  let newSpiceNames = {};
  let newSpiceLevels = {};

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const handleAddSpice = (spice, level) => {
    let updatedStore = store;
    updatedStore[spice] = level;
    setStore(updatedStore);
    FSServices.updateStore(store, props.userId);
  };

  const handleNoChanges = (spice) => {
    if (Object.keys(newSpiceLevels).includes(spice)) {
      delete newSpiceLevels[spice];
    }
    if (Object.keys(newSpiceLevels).length === 0 && spiceLevelChanged)
      setSpiceLevelChanged(false);
  };

  const handleSpiceLevelChange = (spice, level) => {
    setSpiceLevelChanged(true);
    newSpiceLevels[spice] = 11 - level;
    console.log(newSpiceLevels);
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
    setFavoritesUpdated(true);
    FSServices.updateFavorites(newFavorites, props.userId);
  };

  const handleSaveSpiceChanges = () => {
    let updatedStore = store;
    setSpiceLevelChanged(false);

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
    setSpiceLevelChanged(false);
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
    if (favoritesUpdated) setFavoritesUpdated(false);
    let sortedKeys = [];
    if (store) sortedKeys = Object.keys(store).sort();

    return sortedKeys.map((spice, index) => {
      if (!filterLowSpices || store[spice] <= 3)
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
                  {favorites.includes(spice) ? (
                    <FavoriteIcon
                      fontSize="small"
                      color="secondary"
                      aria-label={"Favorite Spice"}
                      aria-hidden={"false"}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      fontSize="small"
                      color="secondary"
                      aria-label={"Add to Favorites"}
                      aria-hidden={"false"}
                    />
                  )}
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
                handleNoChanges={handleNoChanges}
              />
            </div>
          );
        else return null;
      else return null;
    });
  };

  return (
    <>
      <Sidebar
        handleSaveSpiceChanges={handleSaveSpiceChanges}
        handleFilterLowSpices={handleFilterLowSpices}
        handleEditSpiceName={handleEditSpiceName}
        handleFilterFavorites={handleFilterFavorites}
        filterLowSpices={filterLowSpices}
        editSpiceName={editSpiceName}
        spiceLevelChanged={spiceLevelChanged}
      />
      <div className={"dashboard_main"}>
        <ReactTooltip />
        <h3 className={"dashboard_username"}>
          {props.displayName}'s Spice Rack
        </h3>

        {error ? <div className={"dashboard_error"}>{error}</div> : null}
        {editSpiceName && !nameToEdit ? (
          <h5 className={"dashboard_edit_header"}>
            Click on a spice name to edit that name or delete that spice
          </h5>
        ) : null}
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
            setError={setError}
            store={store}
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
    </>
  );
}
