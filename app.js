(function() {

  $(".slide").on("click", function() {
    var drinkType = $(this).attr("data-type");
    var drink = $(this).attr("data-drink");
    var mocktails = $(this).attr("data-mocktails");
    var random = $(this).attr("data-random");
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink + "&api_key=1";
    var queryURLtwo = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + mocktails + "&api_key=1";
    var queryURLthree = "https://www.thecocktaildb.com/api/json/v1/1/" + random + ".php"; // do not need API Key 
    
    //console.log(mocktails)

  
    if ( drinkType === "drink") {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
      
        console.log(response);

        var results = response.drinks;


        console.log(results[0].strDrink);
    

        var drinkDiv = $("<div>");
        var p = $("<p>").text("Drink recommendation: " + results[0].strDrink);
        var drinkImage = $("<img>");

        drinkImage.attr("src", results[0].strDrinkThumb);
        $(drinkDiv).append(p);
        $(drinkDiv).append(drinkImage);
        $("#information-appear-here").prepend(drinkDiv);

        });
    }    

    if ( drinkType === "mocktails") {
      $.ajax({
        url: queryURLtwo,
        method: "GET"
      }).then(function(response) {

        console.log(response);

        var results = response.drinks;

        number = results[0].idDrink;
        
        var drinkDiv = $("<div>");

        var p = $("<p>").text("Drink recommendation: " + results[0].strDrink);

        console.log(results[0].strDrink);

        var drinkImage = $("<img>");

        drinkImage.attr("src", results[0].strDrinkThumb);

        $(drinkDiv).append(p);
  
        $(drinkDiv).append(drinkImage);
        
        $("#information-appear-here").prepend(drinkDiv);
      });
    }

    if ( drinkType === "random") {
      $.ajax({
        url: queryURLthree,
        method: "GET"
      }).then(function(response) {

        console.log(response);

        var results = response.drinks;

        console.log(results);

        var drinkDiv = $("<div>");

        var p = $("<p>").text("Drink recommendation: " + results[0].strDrink);

        console.log(results[0].strIngredient1);

        var drinkImage = $("<img>");

        drinkImage.attr("src", results[0].strDrinkThumb);

        var drinkInfo = $("<p>").text("Instructions: " + results[0].strInstructions);
        
        var drinkIngredient = "";
        var drinkMesurement = "";
        var ingredients = "";
        for (var i = 1; i < 15 ; i++) {
            if (results[0]['strIngredient' + i] != null) {
              var drinkIngredient = results[0]['strIngredient'+i];
            } else {var drinkIngredient = "";}

            if (results[0]['strMeasure' + i] != null) {
              var drinkMesurement = results[0]['strMeasure'+i];
            } else {var drinkMesurement = "";}

            if (drinkIngredient != "" || drinkMesurement != "") {
            ingredients += "<span>" + drinkMesurement + " " +  drinkIngredient + "</span>";
            }  
        }; 
  
        $("<p>").html(ingredients);
        
        console.log(drinkIngredient);

        $(drinkDiv).append(p);
            
        $(drinkDiv).append(drinkImage);

        $(drinkDiv).append(drinkInfo);

        $(drinkDiv).append(ingredients);
        
        $("#information-appear-here").prepend(drinkDiv);
      });
    }

    clear();
  });

  function clear() {
    $("#information-appear-here").empty();
  };


}());