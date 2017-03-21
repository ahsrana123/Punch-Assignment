/*
 * Retrieve the titles from addresses using promises
 */
request = require("request");
cheerio = require("cheerio");

function retrieve(addresses) {
  console.log(addresses); // Horraaayy...you got the list of addresses from query parameters

  var titlesCount = addresses.length;
  var titles = [];

  return new Promise(function (resolve, reject) {
    var getTitles = function (resp) {

      var url = addresses[addresses.length - titlesCount];
      var regEx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      if (!regEx.test(url))
        url = "http://" + url;

      request(url, function (err, responsem, html) {
        if (err)
          reject(err);
        else
          try {
            var $ = cheerio.load(html);
            var title = $('title').text();
            titles[addresses.length - titlesCount] = title;
            titlesCount--;
            if (titlesCount)
              getTitles();
            else
              resolve(titles);
          }
          catch (err) {
            reject(err);


          }
      });

    }
    getTitles();
  });

  // TODO: Add code here usig promises
}

/* ***************************** Module Exports ******************************* */
exports.retrieve = retrieve;
