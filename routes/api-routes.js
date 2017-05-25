//Dependencies
//---------------------------------------------------------------------------------
var request = require("request");
var cheerio = require("cheerio");

var Article = require("../models/article.js");
//=================================================================================

module.exports = function(app) {

app.post("/api/signup", function (req, res) {
	res.json(req.body);
});

app.post("/api/signin", function (req, res) {
	res.json(req.body);
});

app.get("/api/scrape/kotaku", function (req, res) {
  	request("http://kotaku.com/", function(error, response, html) {
	    
	    var $ = cheerio.load(html);
	    $("article").each(function(i, element) {

	      var result = {};

	      result.title = $(this).children("header").children("h1").children("a").text();
	      result.link = $(this).children("header").children("h1").children("a").attr("href");

	      result.pic = $(this).children("div.item__content").children("figure").children("a").children("div").children("picture").children("source").attr("data-srcset");
	      result.blurb = $(this).children("div.item__content").children("div.excerpt").children("p").text();

	      // console.log(result);

	      var entry = new Article(result);

	      entry.save(function(err, doc) {
	        if (err) {
	          console.log(err);
	        }
	        else {
	          console.log(doc);
	        }
	      });

		});
	});
	res.send("Scrape Completed");
});







};