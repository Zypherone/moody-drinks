

var pageLanding = $('section').html();

var template = Handlebars.compile(pageLanding);
  // execute the compiled template and print the output to the console

var temp =   template({ BODY_CONTENT: "rocks!" })

$('section').html(temp);
//pageLanding.html(temp);
  