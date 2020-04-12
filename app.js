// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-GOrUlVPWlJUK2PfFQAdol2yaEKkm0oE",
  authDomain: "moody-drinks.firebaseapp.com",
  databaseURL: "https://moody-drinks.firebaseio.com",
  projectId: "moody-drinks",
  storageBucket: "moody-drinks.appspot.com",
  messagingSenderId: "97317353672",
  appId: "1:97317353672:web:490d5ee3ac7429f6980dfd",
  measurementId: "G-8T4VP4G146"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var functionAPP, 
    appSetPage = '',
    apiBaseUri = "https://www.thecocktaildb.com/api/json/v1/1/";

var dropdownDOM = []; // Store dropdown events

// Prepare the basic page setup
function app() {

  let activePage = $('.engaged');

  functionAPP = {
    // To hide page
    hidePage: function() {
      $('.ui.active').addClass('dimmer');

      // Chain all the add/removal classes for new page.
      activePage.addClass('hide').removeClass('engaged').delay(700 ).queue(function(next){

        // Store template into a var to append for later use
        if (activePage.attr('id') !== 'page-landing') {
           // Reset dropdown events
          dropdownDOM = [];
          // Grab template so we don't loose it.
          var tpl = $(this).children()[0];
          // Empty page for new page to be displayed/
          $(this).empty();
          $(this).append($(tpl));
        }        
        $(this).addClass("collapse");
        next();

      });
    },
    // To render and show page
    showPage: function(page) {
      // Chain the removal class followed by add classes to the new page
      $('#page-' + page).removeClass('collapse').delay(1).queue(function(next){

        $(this).removeClass('hide').addClass('engaged');
        $('.ui.active').removeClass('dimmer');

        // Display back button when no longer of page landing page.
        if (activePage.attr('id') !== 'page-landing') {
          $('#back-button').removeClass('hide-button');
        }

        // Hide back button when on page landing page.
        if ($(this).attr('id') === 'page-landing') {
          $('#back-button').addClass('hide-button');
        }

        // If results are showing, focus on element so we can display recipe.
        if ($('.engaged > .body-results').length) {
          $('.engaged > .body-results')[0].focus();
        }
        next();
      });   
    },
    setPage: function(value) {
      appSetPage = value;
    },
    getPage: function() {
      return appSetPage;
    }
  }

  return functionAPP;
}

/**
 * 
 * Save to Firebase for favourites and try it.
 * 
 * @param {*} userId 
 * @param {*} listId 
 * @param {*} drinkId 
 * @param {*} drinkName 
 * @param {*} shortcut 
 */
function saveToDB(userId, listId, idDrink, drinkName, shortcut) {

  $(shortcut).addClass('loading');

  const dbCheck = checkDbIfExists(idDrink);
  let updates = {};
  let oldButton = '';


  if ($(shortcut).hasClass('basic')) {
    
    console.log('Active to remove from ' + dbCheck.data.list);
    var newDrinkKey    = dbCheck.id;
    var drinkData      = null;
    
    if ($(shortcut).parents('.viewport').attr('id') !== 'page-results') {
      $(shortcut).parents('.body-results').remove();
    }
  }
  else {

    if (dbCheck !== false) {
      //console.log(listId, dbCheck);

      console.log('Active to move ' + dbCheck.data.list + ' => ' + listId);

      var newDrinkKey    = dbCheck.id;
      var drinkData      = dbCheck.data;
      
      oldButton = $(shortcut).siblings('.button');
      oldButton.toggleClass('basic');
      
      updates['/list/' + dbCheck.data.list + '/' + userId + '/' + newDrinkKey] = null; 
      drinkData.list = listId;

    }
    else {

      console.log('Not active at all, add to: ' + listId);
      // A prepare the drink entry.
      var drinkData = {
        userId: userId,
        list: listId,
        idDrink: idDrink,
        strDrink: drinkName
      };

      // Get a key for a new Post.
      var newDrinkKey = firebase.database().ref().child('drinks').push().key;
    }
  }

  // Write the new entry data simultaneously.
  
  updates['/drinks/' + newDrinkKey] = drinkData; // Not in use for current version, kept for backwards compatibility
  updates['/user/' + userId + '/' + newDrinkKey] = drinkData; // Not in use for current version, kept for backwards compatibility
  updates['/list/' + listId + '/' + userId + '/' + newDrinkKey] = drinkData; 

  //console.log(updates);
  
  // Lets save to the database.
  firebase.database().ref().update(updates, function(error) {
    if (error) {
      console.log(error);
    } else {
      $(shortcut).removeClass('loading').toggleClass('basic');
    }
  });
  
}


function renderPage(page, dataObj) {
     
  if (page === 'list-try'
    || page === 'list-fav'
    || page === 'search-query'
    || page === 'search-results') {
    
    var pageTemplate = $('.template-results').html();
  }
  else {
    var pageTemplate = $('.template-' + page).html();
  }

  //console.log(pageTemplate, dataObj);

  var template = Handlebars.compile(pageTemplate);

  //console.log(pageTemplate, dataObj);
  var temp = template(dataObj);

  $('#page-' + page).append(temp);

  if (page === 'search') {

    //console.log('test');
    dropdownDOM.push( $('.ui.dropdown.apply').dropdown() ); 
  }

;
 
}

/***
 * A function to build th results page for mood, search, try it and fav.
 */

function buildTemplate(drinkId, drinkName, drinkImage, tabIindex) {

  return {
    tabIndex: tabIindex,
    id: drinkId,
    name: drinkName,
    image: '',
    ingredients: [],
    instructions: '',
    tryIt: '',
    fav: ''
  }
}

/**
 * Build search results page
 */

function buildSearchResults() {

  app().hidePage();

  var nextPage = app().getPage();
  var complete = false;

  // Let set and prepare the json Object for handlebar.
  var jsonObj = {
    results: [{
      apply: 'apply',
      categories: [],
      ingredients: []
    }]
  }

  var counter = 0;

  var data = [1];

  function sendRequest(dataObj, index) {
    return new Promise((resolve, reject) => {

      //var obj = new buildSearchResults();
      //jsonObj.results.push(obj);
      
      $.ajax({
        url: apiBaseUri + 'list.php?c=list',
        method: "GET"
      })
      .then(function(resp) {
        counter++;
  
        var r = resp.drinks;
        
        r.forEach(function(valueData) {
          jsonObj.results[0].categories.push({ value: valueData.strCategory });
        });

      })/* Ingredients api temp hashed out due to long response.
      $.ajax({
        url: apiBaseUri + 'list.php?i=list',
        method: "GET"
      })
      .then(function(resp) {
        counter++;
  
        var r = resp.drinks;

        console.log(r);
        
        r.forEach(function(valueData) {
          jsonObj.results[0].ingredients.push({ value: valueData.strIngredient1 });
        });

      })*/
      .then(function() {
        if (counter == data.length) {
          renderPage(nextPage, jsonObj);
          app().showPage(nextPage);
        }
      });

    });
  }

  promises = [];
  
  data.forEach((dataObj, index) => promises.push(sendRequest(dataObj, index)));

}

/**
 * Build Results page
 * @param {*} resp 
 */

function buildResults(resp) {

  app().hidePage();

  var nextPage = app().getPage();
  var complete = false;

  // Let set and prepare the json Object for handlebar.
  var jsonObj = {
    results: []
  }

  if (typeof resp.val === 'function') {
       
    var data = resp.val();

    if (data !== null) {
      data = Object.values(data);
      var returnedLength = data.length;
    } else {
      data = [];
    }

  }
  else { 

    var returnedLength = 15;
    var data = resp.drinks;
        data = _.shuffle(data);
        data = data.slice(0,returnedLength)   
  }

  // Check to see if there is any valid data, if so, lets build it.
  if ( data.length > 0 ) {

    // Prepare a counter so we can 'snyc' and display once all data has been retrieved.
    var counter = 0;

    function sendRequest(dataObj, index) {
      return new Promise((resolve, reject) => {

        // Create a new template
        var obj = new buildTemplate(dataObj.idDrink, dataObj.strDrink, dataObj.strDrinkThumb, index);
        jsonObj.results.push(obj);

        $.ajax({
          url: apiBaseUri + 'lookup.php?i=' + dataObj.idDrink,
          method: "GET"
        })
        .then(function(resp) {
          counter++;
    
          // Store data from respone, and obtain index key of object so we can display it.
          var r = resp.drinks[0];
          var x  = _.findKey(jsonObj.results, { 'id': r.idDrink });
          
          const saved = checkDbIfExists(r.idDrink);
          if (saved !== false) {
            //console.log(saved);
            jsonObj.results[x].tryIt = saved.data.list == 'list-try' ? ' basic ' : '';
            jsonObj.results[x].fav = saved.data.list == 'list-fav' ? ' basic ' : '';
          }
          
          jsonObj.results[x].image = r.strDrinkThumb;
          jsonObj.results[x].instructions = r.strInstructions;

          // Run through all the 15 possible ingredients and measurements data.
          for (var k=1; k<=15; k++) {

            var ingredient = '',
                measurement = '';

            // Check to see if the ingredient string is empty or not
            if (r["strIngredient" + k] != null) {
              ingredient= r["strIngredient" + k];
            } 

            // Check to see if the measurement string is empty or not
            if (r["strMeasure" + k] != null) {
              measurement = r["strMeasure" + k];
            } 

            // Check if both ingredient and measurement are not empty strings
            if (ingredient != "" || measurement != "") {            

              // Push data is the handlebar object
              jsonObj.results[x].ingredients.push({
                name: ingredient,
                measurement: measurement
              });
              
            }
          } // END OF FOR LOOP

        })
        .then(function() {
          // Once counter and the data length matches we can display page.
          if (counter == data.length) {
            renderPage(nextPage, jsonObj);
            app().showPage(nextPage);
          }
        })
      });
    }

    promises = [];
    
    // Lets run through all promises.
    data.forEach((dataObj, index) => promises.push(sendRequest(dataObj, index)));

  }
  else {
    // Display empty results page should there be no data available.
    var tpl = $('.template-empty').html();
    $('#page-' + nextPage).append(tpl);    
    app().showPage(nextPage);
  }

}

/**
 * Retrieve and check db info for removal too.
 * @param {*} e 
 */

var dbLists = [];

firebase.database()
.ref('/user/1')
.on('value', resp => {
  dbLists = resp.val();
})

 
function checkDbIfExists(idDrink) {

  const data = dbLists;
  const keyExists = _.findKey(data, { 'idDrink': idDrink });
  
  //console.log(keyExists);

  if (typeof keyExists === 'string') {
    return { id: keyExists, data: data[keyExists] };
  } else {
    return false;
  }

  //console.log(idDrink);
/*
  firebase.database()
    .ref('/user/' + userId)
    .once('value')
    .then(function(resp) {
      //console.log(resp.val());
      const data = resp.val();
      const keyExists = _.findKey(data, { 'idDrink': idDrink });

      console.log(data);
      if (typeof keyExists === 'string') {
        return data;
      } else {
        return false;
      }
    });
*/
}


/**
 *  Lets build the api callbacks
 * 
 */

function fetchDataApi(e) {

  //console.log($(this).hasClass('menu'));


  let queryUri;

  let type = {
    drink: $(this).attr('data-drink'),
    api: $(this).attr('data-type'),
    page: $(this).attr('data-page')
  }

  if ( $(this).hasClass('menu') ) {
    //console.log($(this).children( ".selected").html());
    type.drink = $(this).children(".selected").html();
    type.api = 'search-results';
    type.page = 'search-results';
  }

  // Correctly configure the request Query URI
  switch (type.api) {
    case 'drink': 
    case 'search-results':
        queryUri = apiBaseUri + 'filter.php?i=' + type.drink;
      break;
    case 'mocktails':
      queryUri = apiBaseUri + 'filter.php?a=Non_Alcoholic';    
      break;
    case 'random':
        queryUri = apiBaseUri + 'random.php';
      break;
    case 'search-query': // When search query input has been populated.
        let searchQuery = $(this.previousElementSibling).val()
        queryUri = apiBaseUri + 'search.php?s=' + searchQuery;
      break;
    // This should be a shortcut, just save it and return
    case 'shortcut':
        var drinkId = $(this).attr('data-id');
        var drinkName = $(this).attr('data-name');
        var listId = $(this).attr('data-page');
        //drinkImage = $(thisObj.currentTarget).attr('data-image');

        // Data into firebase
        saveToDB(1, listId, drinkId, drinkName, $(this));
        return;
      break;
    case 'search':  // Lets display the search page param.
          var nextPage = 'search';
          app().setPage(nextPage);
          buildSearchResults(); // Pull and build search param page.
        return;
      break;
    default: // All else is likely a firebase request.
        if (type.page == 'list-fav' || type.page == 'list-try' )
        queryUri = 'firebase';
      break;
  }

  /**
   * Lets build the uri and link the pages together.
   * 
   * @param {*} uri 
   * @param {*} nextPage 
   */

  function fetchDataUri(uri, nextPage) {

    userId = 1; // Firebase user set to ID 1 as there is not auth available.
    var data;

    app().setPage(nextPage);

    // Fetch data from firebase (for fav and try it)
    if (uri === 'firebase') {

      firebase.database()
        .ref('/list/' + nextPage + '/' + userId + '')
        .once('value')
        .then(buildResults);

    } 
    // Fetch data from cocktail API
    else {

      $.ajax({
        url: uri,
        method: "GET"
      })
      .then(buildResults);

    }

  }

  fetchDataUri(queryUri, type.page);
}


// Lets set all the click events
$('#back-button').on('click', function() {
  app().hidePage();
  app().showPage('landing');
});
// Turn all buttons with [data-page] attr in page request.
$(document).on('click', 'button[data-page]', fetchDataApi);
// Set events for the mood sliders.
$(document).on('click', '.slide', fetchDataApi);
