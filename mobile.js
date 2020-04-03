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

function app() {

  let activePage = $('.active');

  functionAPP = {
    hidePage: function() {
      activePage.addClass('hide').removeClass('active').delay(400).queue(function(next){
        // Store template into a var to append for later use
        var tpl = $(this).children()[0];
        $(this).empty();
        $(this).append(tpl);
        $(this).addClass("collapse");
        next();
      });
    },
    showPage: function(page) {
      $('#page-' + page).removeClass('collapse').delay(1).queue(function(next){
        $(this).removeClass('hide').addClass('active');
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
     
  var pageTemplate = $('.template-' + page).html();
  var template = Handlebars.compile(pageTemplate);
  var temp = template(dataObj);

  $('#page-' + page).append(temp);
 
}

/***
 * A function to build th results page for mood, search, try it and fav.
 */

function buildTemplate(drinkId, drinkName, drinkImage, drinkInstructions) {

  return {
    id: drinkId,
    name: drinkName,
    image: drinkImage,
    ingredients: [],
    instructions: drinkInstructions
  }
}

function buildResults(resp) {

  app().hidePage();

  var nextPage = app().getPage();

  // Let set and prepare the json Object for handlebar.
  var jsonObj = {
    results: []
  }

  if (typeof resp.val === 'function') {
       
    var data = resp.val();
        data = Object.values(data);

  }
  else { 

    var data = resp.drinks;
        data = _.shuffle(data);
    
  }

  // Check to see if there is any valid data, if so, lets build it.
  if ( data !== null ) {
    
    var returnedLength = data.length;
    for(i=0;i<returnedLength;i++) {

      var obj = new buildTemplate(data[i].idDrink, data[i].strDrink, data[i].strDrinkThumb);
      jsonObj.results.push(obj);
      
      // Start of second ajax call for the rest of the data.
      $.ajax({
        url: apiBaseUri + 'lookup.php?i=' + data[i].idDrink,
        method: "GET"
      }).then(function(resp) {
        
        var r = resp.drinks[0];
        obj.image = obj.image ? obj.image : r.strDrinkThumb;
        obj.instructions = r.strInstructions;

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
            obj.ingredients.push({
              name: ingredient,
              measurement: measurement
            });
          }
        }

        // If we have completed the last callback, we can render the page.
        if (i === returnedLength) {
          renderPage(nextPage, jsonObj);
          app().showPage(nextPage);
        }
      });

    }

  }
  else {

    /*
    var tpl = $('.template-empty').html();
    // show no display result
    var template = Handlebars.compile(tpl);

    var temp = template({page_name: 'blah'});

    $('#page-').append(temp);
    */
  }

}

/**
 *  Lets build the api callbacks
 * 
 */

function fetchDataApi(e) {

  let queryUri;

  let type = {
    drink: $(this).attr('data-drink'),
    api: $(this).attr('data-type'),
    page: $(this).attr('data-page')
  }

  switch (type.api) {
    case 'drink': 
        queryUri = apiBaseUri + 'filter.php?i=' + type.drink;
      break;
    case 'mocktails':
      queryUri = apiBaseUri + 'filter.php?i=a=Non_Alcoholic';    
      break;
    case 'random':
        queryUri = apiBaseUri + 'random.php';
      break;
    case 'shortcut':
        var drinkId = $(this).attr('data-id');
        var drinkName = $(this).attr('data-name');
        var listId = $(this).attr('data-page');
        //drinkImage = $(thisObj.currentTarget).attr('data-image');

        // Data into firebase
        saveToDB(1, listId, drinkId, drinkName, $(this));
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

    if (uri === 'firebase') {

      firebase.database()
        .ref('/list/' + nextPage + '/' + userId + '')
        .once('value')
        .then(buildResults);

    } 
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
$(document).on('click', 'button[data-page]', fetchDataApi);
$(document).on('click', '.slide', fetchDataApi);
