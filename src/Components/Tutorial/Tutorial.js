import React from "react";
import "./Tutorial.css";

export default function Tutorial(props) {
  return (
    <div className={"tutorial_main"}>
      <h2 className={"tutorial_title"}>Welcome to sprack!</h2>
      <p className={"tutorial_copy first_p"}>
        Sprack is your easy-to-use, customizable digital spice rack. Writing a
        shopping list and can't remember if you have that one obscure spice?
        Check sprack! In the store and wondering if you should pick up some
        turmeric? Check sprack! Take all of the guesswork out of maintaining
        your spice rack with sprack.
      </p>
      <h3 className={"tutorial_header"}>The Dashboard</h3>
      <p className={"tutorial_copy"}>
        The dashboard is where all of your sprack functions and spice
        information is stored. From here, you can adjust your spice levels, add
        new spices, rename your spices, and delete anything you don't need
        anymore.
      </p>
      <img
        className={"tutorial_image"}
        src="../images/sprackDashboard.png"
        alt={"sprack dashboard"}
      />
      <h3 className={"tutorial_header"}>Filter</h3>
      <p className={"tutorial_copy"}>
        When you click on the filter button, you can choose to filter your spice
        rack to show your favorite spices and spices that are getting low. Add
        spices, or remove them, by clicking on the heart icon next to each
        spice.
      </p>
      <img
        className={"tutorial_image"}
        src="../images/sprackFilter.png"
        alt={"sprack dashboard filtering"}
      />
      <h3 className={"tutorial_header"}>Updating Levels</h3>
      <p className={"tutorial_copy"}>
        At any time, you can adjust the level of your spices. When sprack
        detects that you've made a change, the button that allows you to save
        your changes will light up. When you're done adjusting your spice
        levels, click the save button and your database will be updated.
      </p>
      <img
        className={"tutorial_image"}
        src="../images/sprackUpdateLevels.png"
        alt={"sprack update level"}
      />
      <h3 className={"tutorial_header"}>Adding to the Rack</h3>
      <p className={"tutorial_copy"}>
        After you've picked up a new spice for your spice rack, don't forget to
        add it to sprack! Click on the "Add Spice" button at the end of your
        rack. Once you do, fill out the name of the spice and set the level of
        your spice. When you save, your new spice will find its place in your
        rack and you'll be good to go!
      </p>
      <img
        className={"tutorial_image"}
        src="../images/sprackAddSpice.png"
        alt={"sprack adding a spice"}
      />
      <h3 className={"tutorial_header"}>Editing Names and Deleting Spices</h3>
      <p className={"tutorial_copy"}>
        If you decided to rename a spice, or need to remove a spice from your
        rack, click on the edit button. After clicking on that button, choose
        any spice you wish to edit. A form will appear that will allow you to
        change the selected name or remove it from your rack.
      </p>
      <img
        className={"tutorial_image"}
        src="../images/sprackNameEdit.png"
        alt={"sprack editing a name"}
      />
      <div className={"tutorial_button_div"}>
        <button
          className={"tutorial_button_register"}
          onClick={() => props.setDisplay("register")}
        >
          Get Started!
        </button>
      </div>
    </div>
  );
}
