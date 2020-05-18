import React, { useState, useEffect } from "react";
import AddSpiceForm from "../../Forms/AddSpiceForm";
import FSServices from "../../Services/FSServices";

const Dashboard = () => {
  const [spiceRack, setSpiceRack] = useState([]);

  useEffect(() => {
    const fetchSpices = async () => {
      let spices = [];
      return await FSServices.fetchSpices().then(snapshot => {
        snapshot.forEach(doc => {
          spices.push(doc.data().name);
        });
        return spices;
      });
    };
    fetchSpices().then(res => setSpiceRack(res));
  });

  const populateSpiceRack = () => {
    return spiceRack.map(spice => {
      return <li>{spice}</li>;
    });
  };

  return (
    <div>
      <ul>{populateSpiceRack()}</ul>
      <AddSpiceForm />
    </div>
  );
};

export default Dashboard;
