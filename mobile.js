

var pageLanding = $('<section>').html();

var template = Handlebars.compile(pageLanding);
  // execute the compiled template and print the output to the console

  template({ BODY_CONTENT: "rocks!" })
pageLanding.html();
  