This project was bootstrapped with Create React App.

# npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

# npx json-server --watch data/db.json --port 8000
Runs the backend data

The page will reload when you make changes.
You may also see any lint errors in the console.

# Folder Structure
* Package.json: Saves all the dependencies required for the UI
* Router.js: Contains all the redirection route paths to each module
* Src : All the common components will be saved in the components folder All the data related files will be saved in the configs folder All the used images will be saved in the images folder

# Naming conventions
* Folder names should be saved in lowercase
* React Component should be UpperCamelCase
* All constants, variables, and function names should be lowerCamelCase
* Values should be snake_case

# File Import
(Followed the below order for grouping the imports and one line gap after every group)
* Public modules import
* Private modules import ( local files )
* Models/Configs

# Coding Standards
* Code is written in Functional Component
* Files should not have more than 200 lines