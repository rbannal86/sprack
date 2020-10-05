import React, { useState } from "react";
import STORE from "../../Services/STORE";
import Box from "../Box/Box";
import AddSpiceBox from "../AddSpiceBox/AddSpiceBox";
import AddSpiceForm from "../AddSpiceForm/AddSpiceForm";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

export default function Dashboard2() {
  const [showAddSpice, setAddShowSpice] = useState(false);
  const [filterLowSpices, setFilterLowSpices] = useState(false);
  const [editSpiceName, setEditSpiceName] = useState(false);
  const [store, setStore] = useState(STORE);
  const [storeUpdated, setStoreUpdated] = useState(false);

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

  const handleEditSpiceName = () => {
    if (editSpiceName) {
      let updatedSpices = Object.keys(newSpiceNames);
      updatedSpices.forEach((spice) => {
        delete Object.assign(STORE, { [newSpiceNames[spice]]: STORE[spice] })[
          spice
        ];
      });
      newSpiceNames = {};
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
            {editSpiceName ? (
              <input
                className={"spice_header"}
                defaultValue={spice}
                onChange={(e) => handleNameUpdate(spice, e.target.value)}
              />
            ) : (
              <div className={"spice_header"}>{spice}</div>
            )}
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
      <Sidebar
        handleSaveSpiceChanges={handleSaveSpiceChanges}
        handleFilterLowSpices={handleFilterLowSpices}
        handleEditSpiceName={handleEditSpiceName}
        filterLowSpices={filterLowSpices}
        editSpiceName={editSpiceName}
      />
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
