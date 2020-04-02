var pageLanding = $('.results').html();

var template = Handlebars.compile(pageLanding);

var temp =
  template({ 
    results: [
      { 
        id: 1,
        name: "test",
        instructions: "blah blah blah",
        ingredients: [{
          name: "test",
          measurement: "1oz"
        },
        {
          name: "test 2",
          measurement: "20 ml"
        }]
      },
      { 
        id: 2,
        name: "test2",
        instructions: "blah blah blah",
        ingredients: [{
          name: "test",
          measurement: "1oz"
        },
        {
          name: "test 2",
          measurement: "20 ml"
        }]
      }
    ]  
  });

$('#page-results').append(temp);


$(document).on('click', '.slider-nav a', function(e) {
  e.preventDefault();

  //$($(this).attr('href')).getParrent
  $('.holder').attr('style', 'scroll-snap-destination: 50% 50%;');
});

