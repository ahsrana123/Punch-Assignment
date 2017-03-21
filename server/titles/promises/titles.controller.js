const titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.query.address).then(function(response){
     res.send('<ul>'+
            '<li>url: google.com title: <h2>'+response[0]+'</h2></li>'+
            '<li>url: http://amazon.com title: <h2>'+response[1]+'</h2></li>'+
            '<li>url: http://www.youtube.com title: <h2>'+response[2]+'</h2></li>'+
         '</ul>');
      }).catch ( function (error) {
         res.send('<h1>Error</h1>');
      });
  
  
}

exports.retrieve = retrieve;
