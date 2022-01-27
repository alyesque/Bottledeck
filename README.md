
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

<h1> What I learned:</h1>

This is the largest scope project I have built so far. One of the main things I learned was how to plan my development steps out and break down the process of creating the app into manageable steps. I wrote steps out on sticky notes and placed them in "not yet started", "started but unfinished", and "finished" sections accordingly. This allowed me to keep track of tasks and prioritize tasks. 

One challenge with this project was that it required the use of several higher order parsing functions which accepted other functions in order to render data with images. The API returns data regarding card mana costs in a variety of different formats, and parsing this data required passing functions to other functions. Some examples of the varying data types returned are below:

<code>{3}{U}, {T}, Discard a card: Untap target creature and gain control of it until end of turn. That creature gains haste until end of turn."</code>
<code>{1}{U}</code>
<code>["Blue", "Green", "Colorless"]</code>

As you can see, there are not totally standardized forms of color notation, and the notation is often mixed in with text in a string. This required being able to determine the location of data that had the "{R}" style formation. This required a parsing function that is shown below: 

```javascript
    const showManaCost = (cost) => {
        if (cost !== undefined) {
          return `<img class="mana" src=${parseColor(cost)} alt="" />`;
        }
      };

    if (x !== undefined) {
      //Creates an empty array to store the coordinates of the opening brackets//
      //Loop through the X string to find the coordinates of the opening brackets and push to array//
      var OB = [];
      for (var i = 0; i < x.length; i++) {
        if (x[i] === "{") OB.push(i);
      }

    //Creates an empty array to store the coordinates of the closing brackets//
    //Loop through the X string to find the coordinates of the closing brackets and push to array//
    var CB = [];
    for (var e = 0; e < x.length; e++) {
      if (x[e] === "}") CB.push(e);
    }

    // Creates a new array to store the output mana values as sweparate array entries//
    // Uses coordinates from OB and CB arrays to push substrings of the X string to the new array//
    let newstring = x;
    let array = [];
    for (var a = 0; a < OB.length; a++) {
      array.push(newstring.substring(OB[a], CB[a] + 1));
    }

    for (var i = 0; i < array.length; i++) {
      newstring = newstring.replace(array[i], showManaCost(array[i]));
    }
```

This function allowed for standardized data notation regarding mana colors and could be used to parse simple strings of mana symbols such as "{R}{W}{B}" as well as pull out data with the "{R}" style formatting from card text. This function was then used as a parameter in a function which returned image components. The process of setting up these functions taught me quite a lot about higher order functions and about string parsing more generally. 

I am very happy with how the project worked out, but I hope to add complexitiy to it moving forward. I want to create a drafting simulator using socket.io and some of my existing API infrastructure. I also want to convert the API to a GraphQL style API in the future to allow more complex data objects to be associated with user profiles. 

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
 
 
