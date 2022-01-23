
<p align="center">
<img src='https://i.imgur.com/uGNAwsN.png' width='600' alt='a sample userprofile'>
  </p>

<h1> Overview </h1>

Bottledeck is a resource for Magic The Gathering Players. Our site allows you to simulate draft sessions with a high level of customization, build and store decks, and search for and view information on cards from a vast library.

Most of our features are only available after registering and logging into the app, although the card library is publicly available.

Our project is only possible because of the incredible work being done by the folks atmagicthegathering.io. While we operate our own servers and databases in order to enable user and deck creation, the raw card data comes from this incredible community resource.

<h1>Technologies</h1>

<ul>
  <li> HTML5
  <li> CSS
  <li> Javascript(ES6)
  <li> React
  <li> Node.js
  <li> Express
  <li> Mongoose
  <li> MongoDB
  <li> Git
  <li> Github 
</ul>

<h1>Approach Taken:</h1>

The first part of development involved integrating the 3rd party Magic API in order to allow the application to display card info. Once the API was integrated into a basic search function, I worked to develope front-end rendering of the data, primarilly using image urls returned from the API. Additionally, I created dynamic routing to generate a unique page component for each card. The pages fetch card data based on a card ID in the route url which is referenced using react-router-dom's useParams hook. Once the ID is assigned to a variable, a useEffect hook is called to make a GET request to the API, which provides data which is rendered with a dynamic component template. 

Once I had set up basic front end integration of the 3rd party API, I turned to developing my own Node server. I created a REST API connected to a MongoDB database for crud operations. I used mongoose to create data-schemas. I developed two basic data schemas: Users and Decks. Users are created using a front-end registration form, as are decks. Deck IDs are stored as in an Array on the User object of the user who created the deck, allowing for development of custom social profiles that display user info as well as decks they have created. I used a similar system to also enable users to add or remove cards from their favorites. I built an in depth deck building app to allow users to create decks with card-data fetched from the API, and I also used dynamic routing to ceate custom disply pages that render deck information and link to relevant card pages.

<h1>Features: </h1>

1. Bottledeck allows for users to create unique profiles to store create decks as well as favorited cards. 

<p align="center">
<img src='https://i.imgur.com/qx9KY2e.png' width='600' alt='a sample userprofile'>
  </p>

2. Bottledeck features a dynamically generated card library that allows for research of specific cards along with the ability to favorite cards

<p align="center">
<img src='https://i.imgur.com/1ZXfCh9.png' width='600' alt='a sample search result'>

<img src='https://i.imgur.com/VgsVBNI.png' width='600' alt='a sample card page'>
  </p>

3. Bottldeck also fatures a custom deck builder to allow users to create and store custom decks. 

<p align="center">
<img src='https://i.imgur.com/VgkuMfm.png' width='600' alt='a sample deck'>
</p>
  
4. Bottledeck also features dynamic rendering and display of deck info. 

<p align="center">
<img src='https://i.imgur.com/e6jdgaX.png' width='600' alt='a sample deck'>
<img src='https://i.imgur.com/P15NSIp.png' width='600' alt='a sample deck'>
 </p>
