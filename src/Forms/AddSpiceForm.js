import React, { useState } from "react";

const AddSpiceForm = () => {
  return (
    <form>
      <label htmlFor="spice_name">Spice Name</label>
      <input
        name="spice_name"
        id="spice_name"
        type="text"
        placeholder="Allspice"
        required
      />
      <input
        name="spice_level"
        id="spice_level"
        type="number"
        placeholder={100}
      />
      <button type="submit">Add Spice</button>
      <button>Cancel</button>
    </form>
  );
};

export default AddSpiceForm;
