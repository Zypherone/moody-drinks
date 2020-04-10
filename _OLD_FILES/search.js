function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
let drinkBoxEl = $("<div>").addClass("searchbox2");

$("#name-search-btn").on("click", function(e) {
  e.preventDefault();
  $(".results").empty();
  $(".results2").empty();

  let name = $("#name").val();

  console.log(name);
  let nameURL =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name;

  $.ajax({
    url: nameURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    let results = response.drinks;

    let resultsNew = shuffle(results);

    if (results !== null) {
      for (i = 0; i < 5; i++) {
        let drinkNameS = $("<h4>").text(resultsNew[i].strDrink);
        let drinkImageS = $("<img>").attr("src", resultsNew[i].strDrinkThumb);

        let drinkDivS = $("<div>");

        drinkImageS.addClass("searchimageResults");

        let favouritesBtn = $("<button>").text("Favourites");
        let tryBtn = $("<button>").text("Try It Later");
        favouritesBtn.addClass("btnStyle btnStyle3");
        tryBtn.addClass("btnStyle btnStyle4");

        drinkDivS.append(drinkNameS, drinkImageS, favouritesBtn, tryBtn);

        drinkBoxEl.append(drinkDivS);

        $(".results").append(drinkBoxEl);
      }
    } else {
      $(".results").html("No results returned!");
    }
  });
});

$(".clear").on("click", function() {
  $("#name").val("");
  $(".results").empty();
});

$("#ingredient-search-btn").on("click", function(e) {
  e.preventDefault();

  $(".results").empty();
  $(".results2").empty();

  let listURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

  $.ajax({
    url: listURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    let results2 = response.drinks;

    let list = $("<ul>");
    let drinkBoxEl = $("<div>").addClass("searchbox2");

    for (let i = 0; i < results2.length; i++) {
      let listEl = $("<li>");
      let ingrEl = $("<button>").text(results2[i].strIngredient1);
      ingrEl.addClass("btnStyle");
      ingrEl.addClass("list-element");
      listEl.append(ingrEl);
      list.append(listEl);
    }
    drinkBoxEl.append(list);
    $(".results").append(drinkBoxEl);

    let choiceDisplay = $("<div>");
    $(".results2").append(choiceDisplay);

    $(".list-element").on("click", function() {
      let ingr = $(this).text();
      console.log(ingr);

      let ingrURL =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingr;

      let yourChoice = $("<div>").addClass("searchbox3");

      $.ajax({
        url: ingrURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        let results4 = response.drinks;

        function shuffle(array) {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;
          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        }

        let results4New = shuffle(results4);

        if (results4.length < 5) {
          let drinkNameS = $("<h4>").text(results4New[0].strDrink);
          let drinkImageS = $("<img>").attr(
            "src",
            results4New[0].strDrinkThumb
          );

          let id = results4[0].idDrink;

          drinkImageS.addClass("searchimageResults");

          let favouritesBtn = $("<button>").text("Favourites");
          let tryBtn = $("<button>").text("Try It Later");
          favouritesBtn.addClass("btnStyle btnStyle3");
          tryBtn.addClass("btnStyle btnStyle4");

          let drinkDivS = $("<div>");

          // drinkDivS.append(drinkNameS, drinkImageS, drinkInstrS);
          drinkDivS.append(drinkNameS, drinkImageS, favouritesBtn, tryBtn);
          yourChoice.append(drinkDivS);
        } else {
          for (i = 0; i < 5; i++) {
            let drinkNameS = $("<h4>").text(results4[i].strDrink);
            let drinkImageS = $("<img>").attr("src", results4[i].strDrinkThumb);
            let drinkDivS = $("<div>");

            drinkImageS.addClass("searchimageResults");

            let favouritesBtn = $("<button>").text("Favourites");
            let tryBtn = $("<button>").text("Try It Later");

            favouritesBtn.addClass("btnStyle btnStyle3");
            tryBtn.addClass("btnStyle btnStyle4");

            drinkDivS.append(drinkNameS, drinkImageS, favouritesBtn, tryBtn);
            yourChoice.append(drinkDivS);
          }
        }
        choiceDisplay.html(yourChoice);
      });
    });
  });
});

$("#category-search-btn").on("click", function(e) {
  e.preventDefault();

  $(".results").empty();
  $(".results2").empty();

  let categoryURL =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  $.ajax({
    url: categoryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    let results3 = response.drinks;

    let category = $("<ul>");

    let drinkBoxEl = $("<div>").addClass("searchbox2");

    for (i = 0; i < results3.length; i++) {
      let categoryEl = $("<li>");
      let cateEl = $("<button>").text(results3[i].strCategory);
      cateEl.addClass("btnStyle");
      cateEl.addClass("cate-element");
      categoryEl.append(cateEl);
      category.append(categoryEl);
    }

    drinkBoxEl.append(category);
    $(".results").append(drinkBoxEl);
    let choiceDisplay = $("<div>");
    $(".results2").append(choiceDisplay);

    $(".cate-element").on("click", function() {
      let cate = $(this).text();
   

      let cateURL =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + cate;

      let yourChoice = $("<div>").addClass("searchbox3");

      $.ajax({
        url: cateURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        let results5 = response.drinks;

        var results5New = shuffle(results5);

        if (results5.length < 5) {
          let drinkNameS = $("<h4>").text(results5[0].strDrink);
          let drinkImageS = $("<img>").attr("src", results5[0].strDrinkThumb);
          let drinkDivS = $("<div>");

          let favouritesBtn = $("<button>").text("Favourites");
          let tryBtn = $("<button>").text("Try It Later");

          drinkDivS.append(drinkNameS, drinkImageS, favouritesBtn, tryBtn);
          yourChoice.append(drinkDivS);
        } else {
          for (i = 0; i < 5; i++) {
            let drinkNameS = $("<h4>").text(results5[i].strDrink);
            let drinkImageS = $("<img>").attr("src", results5[i].strDrinkThumb);
            let drinkDivS = $("<div>");

            drinkImageS.addClass("searchimageResults");

            let favouritesBtn = $("<button>").text("Favourites");
            let tryBtn = $("<button>").text("Try It Later");
            favouritesBtn.addClass("btnStyle btnStyle3");
            tryBtn.addClass("btnStyle btnStyle4");

            drinkDivS.append(drinkNameS, drinkImageS, favouritesBtn, tryBtn);
            yourChoice.append(drinkDivS);
          }
        }
        choiceDisplay.html(yourChoice);
      });
    });
  });
});
