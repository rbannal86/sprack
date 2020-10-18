# sprack

### Overview

Sprack is a digital spice rack app designed around simple use for desktop and mobile. Using a React frontend and a Firebase database, this app is intended to be easy-to-use for a wide range of users, while wrapped in an appealing, data-centric display.

### Features

#### Sample Account and Walkthrough

A new user is given the option before starting an account to check out a sample account pre-loaded with data. The account functions the same was as a normal account, allowing the user to use all of the available functions, but the account is regularly reset based off of user actions. A user also has the option to view a description of the app with pictures in order to get an idea of what functions are available, after which they are invited to register a new account.

#### Register and Log In

A new user is prompted to input their email, a display name, and a password when registering. The email must be unique, but the display name is simply used ass a header on the dashboard. Once a user registers, the app will save the user id used to access their records in the database to local storage, allowing for persistent log in. When a user logs out, the id is deleted from local storage. When a user logs in, the id is saved once more.

#### Dashboard

When a user logs in, the data from the database is fetched and displayed in the dashboard. All of the user's spices are shown with their names and levels in alphabetical order. The user can perform the following functions in the dashboard:

##### Change Spice Levels

Without toggling a level edit mode, the user can change the levels of any spice displayed at any time. When a spice is changed in this way, the spice box will highlight and the "Save Changes" button will turn red, prompting the user to save any changes once they are done setting levels.

##### Edit Spice Name and Delete

After clicking the Spice Edit button, the user may then click on the name of a spice to open a form allowing them to either rename the spice or delete the spice permanently. The change is immediately saved upon submission, but a user may continue editing in this way until the Spice Edit button is clicked again.

##### Favorites

By clicking on the heart icon next to the name of a spice, a user is able to set up a favorites spices list that will display when the "Favorites" option is selected from the Filter list.

##### Filter

When clicking on the Filter button, a user is then given the option from filtering for favorites-only and/or low spices-only.

##### Feedback

Clicking on the feedback button displays a form that allows a user to submit feedback. This is mostly a tool for the user testing portion of development.

### Links

GitHub Repo: https://github.com/rbannal86/sprack

Live Site: https://sprack.vercel.app/

### Tech Stack

Front End: React.js, JavaScript, HTML, CSS

Back End: Firebase
