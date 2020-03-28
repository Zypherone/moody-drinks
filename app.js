(function() {

  $(".slide").on("click", function() {
    var drinkType = $(this).attr("data-type");
    var drink = $(this).attr("data-drink");
    var mocktails = $(this).attr("data-mocktails");
    var random = $(this).attr("data-random");
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink + "&api_key=1";
    var queryURLtwo = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + mocktails + "&api_key=1";
    var queryURLthree = "https://www.thecocktaildb.com/api/json/v1/1/" + random + ".php"; // do not need API Key 
    
      
    if (drinkType === "drink") {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var results = response.drinks;
        var randomEl = Math.floor(Math.random() * results.length);
        console.log(randomEl);

        var drinkDiv = $("<div>");
        var drinkName = $("<p>").text(
          "Drink recommendation: " + results[randomEl].strDrink
        );
        var drinkImage = $("<img>");
        drinkImage.attr("src", results[randomEl].strDrinkThumb);

        var drinkId = results[randomEl].idDrink;
        console.log(drinkId);

        var drinkIngredient = "";
        var drinkMesurement = "";
        var ingredients = "";
        var drinkInstr = "";

        // grab the drink ID to bring up instructions
        var queryURL =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
          drinkId;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var resultstwo = response.drinks;

          console.log(resultstwo[0].strInstructions);

          drinkInstr = $("<p>").text(
            "Instructions: " + resultstwo[0].strInstructions
          );

          for (var i = 1; i < 15; i++) {
            if (resultstwo[0]["strIngredient" + i] != null) {
              var drinkIngredient = resultstwo[0]["strIngredient" + i];
            } else {
              var drinkIngredient = "";
            }

            if (resultstwo[0]["strMeasure" + i] != null) {
              var drinkMesurement = resultstwo[0]["strMeasure" + i];
            } else {
              var drinkMesurement = "";
            }

            if (drinkIngredient != "" || drinkMesurement != "") {
              ingredients +=
                "<span>" +
                drinkMesurement +
                " " +
                drinkIngredient +
                "</span>";
            }
          }
          console.log(ingredients);
          $(drinkDiv).append(drinkInstr);
          $(drinkDiv).append($("<p>").html(ingredients));
        });

        $(drinkDiv).append(drinkName);
        $(drinkDiv).append(drinkImage);
        $("#information-appear-here").prepend(drinkDiv);
      });
    }

    if (drinkType === "mocktails") {
      $.ajax({
        url: queryURLtwo,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var results = response.drinks;
        var randomEl = Math.floor(Math.random() * results.length);
        console.log(randomEl);

        number = results[randomEl].idDrink;

        var drinkDiv = $("<div>");

        var drinkName = $("<p>").text(
          "Drink recommendation: " + results[randomEl].strDrink
        );

        console.log(results[randomEl].strDrink);

        var drinkImage = $("<img>");
        drinkImage.attr("src", results[randomEl].strDrinkThumb);

        var drinkId = results[randomEl].idDrink;
        console.log(drinkId);

        var drinkIngredient = "";
        var drinkMesurement = "";
        var ingredients = "";
        var drinkInstr = "";

        var queryURL =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
          drinkId;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var resultstwo = response.drinks;

          console.log(resultstwo[0].strInstructions);

          drinkInstr = $("<p>").text(
            "Instructions: " + resultstwo[0].strInstructions
          );

          for (var i = 1; i < 15; i++) {
            if (resultstwo[0]["strIngredient" + i] != null) {
              var drinkIngredient = resultstwo[0]["strIngredient" + i];
            } else {
              var drinkIngredient = "";
            }

            if (resultstwo[0]["strMeasure" + i] != null) {
              var drinkMesurement = resultstwo[0]["strMeasure" + i];
            } else {
              var drinkMesurement = "";
            }

            if (drinkIngredient != "" || drinkMesurement != "") {
              ingredients +=
                "<span>" +
                drinkMesurement +
                " " +
                drinkIngredient +
                "</span>";
            }
          }
          console.log(ingredients);
          $(drinkDiv).append(drinkInstr);
          $(drinkDiv).append($("<p>").html(ingredients));
        });

        $(drinkDiv).append(drinkName);
        $(drinkDiv).append(drinkImage);
        $("#information-appear-here").prepend(drinkDiv);
      });
    }

    if (drinkType === "random") {
      $.ajax({
        url: queryURLthree,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var results = response.drinks;

        console.log(results);

        var drinkDiv = $("<div>");

        var drinkName = $("<p>").text(
          "Drink recommendation: " + results[0].strDrink
        );

        console.log(results[0].strIngredient1);

        var drinkImage = $("<img>");
        drinkImage.attr("src", results[0].strDrinkThumb);

        var drinkInstr = $("<p>").text(
          "Instructions: " + results[0].strInstructions
        );

        var drinkIngredient = "";
        var drinkMesurement = "";
        var ingredients = "";
        for (var i = 1; i < 15; i++) {
          if (results[0]["strIngredient" + i] != null) {
            var drinkIngredient = results[0]["strIngredient" + i];
          } else {
            var drinkIngredient = "";
          }

          if (results[0]["strMeasure" + i] != null) {
            var drinkMesurement = results[0]["strMeasure" + i];
          } else {
            var drinkMesurement = "";
          }

          if (drinkIngredient != "" || drinkMesurement != "") {
            ingredients +=
              "<span>" + drinkMesurement + " " + drinkIngredient + "</span>";
          }
        }

        $("<p>").html(ingredients);

        console.log(drinkIngredient);

        $(drinkDiv).append(drinkName);
        $(drinkDiv).append(drinkImage);
        $(drinkDiv).append(drinkInstr);
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