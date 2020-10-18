import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Box from "../Box/Box";
import AddSpiceBox from "../AddSpiceBox/AddSpiceBox";
import AddSpiceForm from "../AddSpiceForm/AddSpiceForm";
import Sidebar from "../Sidebar/Sidebar";
import PopUpNameEdit from "../PopUpNameEdit/PopUpNameEdit";
import Feedback from "../Feedback/Feedback";
import FSServices from "../../Services/FSServices";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./Dashboard.css";

export default function Dashboard2(props) {
  const [showAddSpice, setAddShowSpice] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
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

  //Variables not tied to state to keep track of changes before submission
  let newSpiceNames = {};
  let newSpiceLevels = {};

  //Prevents the tooltips from disappearing under certain circumstances
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  //When a user adds a spice, updates the local store, then updates the database
  const handleAddSpice = (spice, level) => {
    let updatedStore = store;
    updatedStore[spice] = level;
    setStore(updatedStore);
    FSServices.updateStore(store, props.userId);
  };

  //Clears the variable keeping track of level changes in order to revert to
  //the non-changed state. Removes the highlight on the save changes button.
  const handleNoChanges = (spice) => {
    if (Object.keys(newSpiceLevels).includes(spice)) {
      delete newSpiceLevels[spice];
    }
    if (Object.keys(newSpiceLevels).length === 0 && spiceLevelChanged)
      setSpiceLevelChanged(false);
  };

  //Triggers a rerender with setSpiceLevelChange and adds the changed spice
  //to the newSpiceLevels for future database update
  const handleSpiceLevelChange = (spice, level) => {
    setSpiceLevelChanged(true);
    newSpiceLevels[spice] = 11 - level;
  };

  //Updates the favorites and triggers a rerender to show the appropriate
  //favorite icon next to the updated spice
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

  //Updates the client side store with new spice levels, then updates
  //the database. Triggers a rerender to clear updated spice level
  //feedback
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

  //Toggles the low spice filter
  const handleFilterLowSpices = () => {
    setFilterLowSpices(!filterLowSpices);
  };

  //Toggles the favorites filter
  const handleFilterFavorites = () => {
    setFilterFavorites(!filterFavorites);
  };

  //Toggles the add spice form
  const handleOpenAddSpice = () => {
    setAddShowSpice(!showAddSpice);
  };

  //Toggles the feedback form
  const handleOpenFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  //First checks if an error is present. If so, removes the error. Then, checks
  //if the spice name is already in use and sets an appropriate error. Then,
  //toggles the spiceLevelChanged off to render the appropriate new information.
  //Checks the favorites and updates the name in that list on the client side, then
  //updates the database. Checks if the new name is empty and deletes the spice, or
  //deletes the old name from the local store, adds the new name with the old level
  //and updates the databse. Updates all the appropriate state values to rerender
  //with the updated dashboard.
  const handleEditSpiceSubmit = (name) => {
    if (error) setError(null);
    if (Object.keys(store).includes(name))
      setError("This spice already exists");
    else {
      setSpiceLevelChanged(false);
      if (favorites.includes(nameToEdit)) {
        let updatedFavorites = favorites.filter(
          (spice) => spice !== nameToEdit
        );
        if (name.length !== 0) updatedFavorites.push(name);
        FSServices.updateFavorites(updatedFavorites, props.userId);
        setFavorites(updatedFavorites);
      }
      let updatedStore = store;
      if (name.length === 0) delete updatedStore[nameToEdit];
      else {
        delete Object.assign(updatedStore, {
          [name]: updatedStore[nameToEdit],
        })[nameToEdit];
      }
      setStore(updatedStore);
      setNameToEdit(null);
      FSServices.updateStore(store, props.userId);
    }
  };

  //Toggles the edit spice name mode
  const handleEditSpiceName = () => {
    if (editSpiceName) {
      handleNameUpdate(nameToEdit);
      setNameToEdit(null);
    }
    setEditSpiceName(!editSpiceName);
  };

  //Modifies the non-state variable, newSpiceNames, when a name is changed
  const handleNameUpdate = (originalName, newName) => {
    let updatedSpiceName = newSpiceNames;
    updatedSpiceName[originalName] = newName;
    newSpiceNames = updatedSpiceName;
  };

  //render function that returns a Box for each spice in alphabetical order
  //Shows the name of the spice and the favorite icon
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
                      fontSize="inherit"
                      color="secondary"
                      aria-label={"Favorite Spice"}
                      aria-hidden={"false"}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      fontSize="inherit"
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
      <ReactTooltip
        place={"right"}
        effect={"solid"}
        wrapper={"span"}
        afterShow={() => setTimeout(ReactTooltip.hide, 1000)}
      />
      <Sidebar
        handleSaveSpiceChanges={handleSaveSpiceChanges}
        handleFilterLowSpices={handleFilterLowSpices}
        handleEditSpiceName={handleEditSpiceName}
        handleFilterFavorites={handleFilterFavorites}
        handleOpenFeedback={handleOpenFeedback}
        showFeedback={showFeedback}
        filterLowSpices={filterLowSpices}
        editSpiceName={editSpiceName}
        spiceLevelChanged={spiceLevelChanged}
      />
      <div className={"dashboard_main"}>
        <h3 className={"dashboard_username"}>
          {props.displayName}'s Spice Rack
        </h3>
        {showFeedback ? (
          <Feedback userId={props.userId} showFeedback={setShowFeedback} />
        ) : null}
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
