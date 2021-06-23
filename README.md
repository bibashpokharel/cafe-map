# App for demo

### This backend is for google map for coffee lover.

Basically, you will use a google map to find the nearest cafe. And if you want to meet with your friend for a cup of coffee, then it will find the nearest cafe depending on the location of both of you.

#### What are the features then?

<ul>
<li>create basic user account</li>
<li> allow user to select their favourite cafes </li>
<li> if they want to have a cup of coffee, find the nearest cafe from their current location</li>
<li>if they want to have a coffee meet with their friend, find the nearest cafe depeding on both of their location</li>
</ul>

#### Routes:

<ul>
<li>/api/v1/user/create : to create a new user</li>
<li>/api/v1/cafe/create : to create a new cafe</li>
<li>/api/v1/cafe/favourite : to add a cafe to the user favourite list</li>
<li>/api/v1/cafe/nearest : to find the nearest the cafe from user's favourite list from user current location </li>
</ul>

### How to run the app?

First install all node_modules using command "yarn" or "npm install".<br>
First build the app using the command "yarn build" or "npm run build". Then you can run the "main.js" file inside the "dist" folder.<br>
To run the app in dev environment use the command "yarn start:dev" or "npm run start:dev".<br>
Remember to rename the .env.example file to .env and change the value accordingly.
