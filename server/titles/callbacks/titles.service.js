/*
 * Retrieve the titles from addresses using callbacks
 */
request = require("request");
cheerio = require("cheerio");
function retrieve(addresses, callback) {
  console.log(addresses); // Horraaayy...you got the list of addresses from query parameters

  var titlesCount = addresses.length;
  titles = [];

  var getTitles = function (response) {
    var url = addresses[addresses.length - titlesCount];
    // patternRegex = /^((http|https):\/\/)/;
    patternRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (!patternRegex.test(url))
      callback('ERROR');

    request(url, function (err, responsem, html) {
      if (err)
        callback(err);
      else
      try{
        var $ = cheerio.load(html);
      var title = $('title').text();
      titles[addresses.length - titlesCount] = title;
      titlesCount--;
      if (titlesCount)
        getTitles();
      else
        callback(undefined, titles);
      }
      catch(err){
        callback(err);
      }
        
    });
  }

  getTitles();
  // TODO: Add code here usig callbacks

}

/* ***************************** Module Exports ******************************* */
exports.retrieve = retrieve;
//addresses.forEach(function (url) {
  //   request(url, function (err, response, html) {
  //     if (!err) {
  //       console.log(url);
  //       var $ = cheerio.load(html);
  //       //console.log('url reading completed.....');
  //       y = $('title').text();
  //       console.log(y);
  //       titles.push(y);
  //     }

  //   });

  // }, function(){
  //   console.log(titles);
  // });
