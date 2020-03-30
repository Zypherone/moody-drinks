

/*
var pageLanding = $('section').html();

var template = Handlebars.compile(pageLanding);
  // execute the compiled template and print the output to the console

var temp =   template({ BODY_CONTENT: "rocks!" })

$('section').html(temp);
//pageLanding.html(temp);
*/


$(document).on('click', '.slider-nav a', function(e) {
  e.preventDefault();

  //$($(this).attr('href')).getParrent
  $('.holder').attr('style', 'scroll-snap-destination: 50% 50%;');
});