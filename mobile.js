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
    apiBaseUri = "https://www.thecocktaildb.com/api/json/v1/1/";;


// Prepare the basic page setup
function app() {

  let activePage = $('.engaged');

  functionAPP = {
    hidePage: function() {
      $('.ui.active').addClass('dimmer');
      activePage.addClass('hide').removeClass('engaged').delay(700).queue(function(next){
        // Store template into a var to append for later use
        if (activePage.attr('id') !== 'page-landing') {
          var tpl = $(this).children()[0];
          $(this).empty();
          $(this).append($(tpl));
        }        
        $(this).addClass("collapse");
        next();
      });
    },
    showPage: function(page) {
      $('#page-' + page).removeClass('collapse').delay(1).queue(function(next){
        $(this).removeClass('hide').addClass('engaged');
        $('.ui.active').removeClass('dimmer');
        if (activePage.attr('id') !== 'page-landing') {
          $('#back-button').removeClass('hide-button');
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
function saveToDB(userId, listId, drinkId, drinkName, shortcut) {

  // A prepare the drink entry.
  var drinkData = {
    list: listId,
    idDrink: drinkId,
    strDrink: drinkName
  };

  // Get a key for a new Post.
  var newDrinkKey = firebase.database().ref().child('drinks').push().key;

  // Write the new entry data simultaneously.
  var updates = {};
  updates['/drinks/' + newDrinkKey] = drinkData;  
  updates['/user/' + userId + '/' + newDrinkKey] = drinkData;
  updates['/list/' + listId + '/' + userId + '/' + newDrinkKey] = drinkData;

  firebase.database().ref().update(updates, function(error) {
    if (error) {
      console.log(error);
    } else {
      $(shortcut).addClass('saved');
    }
  });
}


function renderPage(page, dataObj) {
     
  if (page === 'list-try'
    || page === 'list-fav'
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
    $('.ui.dropdown')
    .dropdown()
  ; 
  }

;
 
}

/***
 * A function to build th results page for mood, search, try it and fav.
 */

function buildTemplate(drinkId, drinkName, drinkImage, drinkInstructions) {

  return {
    id: drinkId,
    name: drinkName,
    image: '',
    ingredients: [],
    instructions: ''
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

        console.log(r);
        
        r.forEach(function(valueData) {
          jsonObj.results[0].categories.push({ value: valueData.strCategory });
        });

      })/*
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
          console.log(jsonObj);
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
        data = Object.values(data);
    var returnedLength = data.length;

  }
  else { 

    var data = resp.drinks;
        data = _.shuffle(data);
        data = data.slice(0,5)
    var returnedLength = 5;
    
  }

  console.log(data);

  // Check to see if there is any valid data, if so, lets build it.
  if ( data.length > 0 ) {

    var counter = 0;

    function sendRequest(dataObj, index) {
      return new Promise((resolve, reject) => {

        var obj = new buildTemplate(dataObj.idDrink, dataObj.strDrink, dataObj.strDrinkThumb);
        jsonObj.results.push(obj);

        $.ajax({
          url: apiBaseUri + 'lookup.php?i=' + dataObj.idDrink,
          method: "GET"
        })
        .then(function(resp) {
          counter++;
    
          var r = resp.drinks[0];
          var x  = _.findKey(jsonObj.results, { 'id': r.idDrink });
          
          jsonObj.results[x].image = r.strDrinkThumb;
          jsonObj.results[x].instructions = r.strInstructions;

          for (var k=1; k<=15; k++) {

            var ingredient = '',
                measurement = '';

            if (r["strIngredient" + k] != null) {
              ingredient= r["strIngredient" + k];
            } 

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
          if (counter == data.length) {
            renderPage(nextPage, jsonObj);
            app().showPage(nextPage);
          }
        })
      });
    }

    promises = [];
    
    data.forEach((dataObj, index) => promises.push(sendRequest(dataObj, index)));

  }
  else {
    
//    console.log('test');
    
    //renderPage(nextPage, 'error');

    //renderPage(nextPage, jsonObj);
    var tpl = $('.template-empty').html();

    //console.log(nextPage);
    //console.log('#page-' + nextPage);
    // show no display result
    //var template = Handlebars.compile(tpl);
    //var temp = template({ page_name: 'blah' });

    //console.log(temp);
    $('#page-' + nextPage).append(tpl);
    
    app().showPage(nextPage);
  }

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
    type.drink = $(this).children( ".selected").html();
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
    // Should it be a shortcut, just save it and return
    case 'shortcut':
        var drinkId = $(this).attr('data-id');
        var drinkName = $(this).attr('data-name');
        var listId = $(this).attr('data-page');
        //drinkImage = $(thisObj.currentTarget).attr('data-image');

        // Data into firebase
        saveToDB(1, listId, drinkId, drinkName, $(this));
        return;
      break;
    case 'search': 
          var nextPage = 'search';
          var jsonObj = { results: [ { name: 'test' } ]};
          
          app().setPage(nextPage);

          buildSearchResults();

        return;
      break;
    default:
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

    //console.log(uri, nextPage, 'aa');

    userId = 1;
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
$(document).on('click', 'button[data-page]', fetchDataApi);
$(document).on('click', '.slide', fetchDataApi);
