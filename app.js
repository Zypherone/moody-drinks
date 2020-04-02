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

        jsonObj = [{
            id: results[randomEl].idDrink,
            name: results[randomEl].strDrink,
            image: results[randomEl].strDrinkThumb,
            instructions: "",
            ingredients: []
          }];

          console.log(jsonObj[0].id);
          console.log(jsonObj[0].name);
          console.log(jsonObj[0].image);
          
           
        var drinkId = results[randomEl].idDrink;
        console.log(drinkId);

        var drinkIngredient = "";
        var drinkMesurement = "";
        var ingredients = ""; 
        

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

          jsonObj[0].instructions = resultstwo[0].strInstructions;
                      
          for (var i = 1; i < 15; i++) {
            if (resultstwo[0]["strIngredient" + i] != null) {
              drinkIngredient = resultstwo[0]["strIngredient" + i];
            } else {
              drinkIngredient = "";
            }

            if (resultstwo[0]["strMeasure" + i] != null) {
              drinkMesurement = resultstwo[0]["strMeasure" + i];
            } else {
              drinkMesurement = "";
            }

            if (drinkIngredient != "" || drinkMesurement != "") {
              ingredients +=
                "<span>" +
                drinkIngredient +
                " " +
                drinkMesurement +
                "</span>";
                let ingredientsObj = {
                  name: drinkIngredient,
                  mesurements: drinkMesurement
                };
     
                jsonObj[0].ingredients.push(ingredientsObj);
            }

          }
          console.log(jsonObj[0].ingredients)
          console.log(jsonObj[0].instructions);
        });

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

        jsonObj = [
          {
            id: results[randomEl].idDrink,
            name: results[randomEl].strDrink,
            image: results[randomEl].strDrinkThumb,
            instructions: "",
            ingredients: []
          }
        ];

        console.log(jsonObj[0].id);
        console.log(jsonObj[0].name);
        console.log(jsonObj[0].image);

        var drinkId = results[randomEl].idDrink;
        console.log(drinkId);


        var ingredients = "";


        var queryURL =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
          drinkId;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var resultstwo = response.drinks;

          jsonObj[0].instructions = resultstwo[0].strInstructions;

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
                drinkIngredient +
                " " +
                drinkMesurement +
                "</span>";
              let ingredientsObj = {
                name: drinkIngredient,
                mesurements: drinkMesurement
              };

              jsonObj[0].ingredients.push(ingredientsObj);
            }
          }
          console.log(jsonObj[0].ingredients);
          console.log(jsonObj[0].instructions);
        });
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

        jsonObj = [
          {
            id: results[0].idDrink,
            name: results[0].strDrink,
            image: results[0].strDrinkThumb,
            instructions: results[0].strInstructions,
            ingredients: []
          }
        ];
        console.log(jsonObj[0].id);
        console.log(jsonObj[0].name);
        console.log(jsonObj[0].image);

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
                "<span>" +
                drinkIngredient +
                " " +
                drinkMesurement +
                "</span>";
              let ingredientsObj = {
                name: drinkIngredient,
                mesurements: drinkMesurement
              }
              jsonObj[0].ingredients.push(ingredientsObj);
            }
          }
        console.log(jsonObj[0].ingredients);
        console.log(jsonObj[0].instructions);

      });
    }

    clear();
  });

  function clear() {
    $("#information-appear-here").empty();
  };


}());