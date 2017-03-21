const titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.query.address, (err, html) => {
      if(err)
      res.send('<h1>ERROR</h1>')
    else
    
      res.send('<ul><h1> Using callbacks </h1>'+
        '<li>url: google.com title: <h2>'+titles[0]+'</h2></li>'+
        '<li>url: http://amazon.com title: <h2>'+titles[1]+'</h2></li>'+
        '<li>url: http://www.youtube.com title: <h2>'+titles[2]+'</h2></li>'+
      '</ul>');
  });
}

exports.retrieve = retrieve;
