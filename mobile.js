function app() {

  let activePage = $('.active');

  let functionVar = {
    hidePage: function() {

      //console.log('test');

      activePage.addClass('hide').removeClass('active').delay(400).queue(function(next){
        $(this).addClass("collapse");
        next();
      });
    },
    showPage: function(page) {
      $('#page-' + page).removeClass('collapse').delay(1).queue(function(next){
        $(this).removeClass('hide').addClass('active');
        next();
      });
      
    }
  }

  return functionVar;
}

function fetchDataApi(e) {

  let queryUri;

  let type = {
    drink: $(this).attr('data-drink'),
    api: $(this).attr('data-type'),
    page: $(this).attr('data-page')
  }

  let apiBaseUri = "https://www.thecocktaildb.com/api/json/v1/1/";

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
  }

  function fetchDataUri(uri, nextPage) {
    
    $.ajax({
      url: uri,
      method: "GET"
    }).then(function(r) {
      
      //console.log(nextPage);
      //console.log(r);
      app().hidePage();
      app().showPage(nextPage);
      //console.log(r);



    });
  }

  fetchDataUri(queryUri, type.page);

  /*
  switch

  var queryURL = "filter.php?i=" + drink + "&api_key=1";
  var queryURLtwo = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + mocktails + "&api_key=1";
  var queryURLthree = "https://www.thecocktaildb.com/api/json/v1/1/" + random + ".php";

  */

}

$(document).on('click', '.slide', fetchDataApi);