//Dependencies
//---------------------------------------------------------------------------------
var request = require("request");
var cheerio = require("cheerio");

var Site = require("../models/site.js");
var Article = require("../models/article.js");
var Note = require("../models/note.js");
var User = require("../models/user.js");
//=================================================================================

module.exports = function(app) {

app.post("/api/signup", function (req, res) {

	console.log(req.body);

	var info = {}

	info.name = req.body.name;
	info.pass = req.body.pass;

	var entry = new User(info);

	entry.save(function(err, user) {
		if (err) {
			console.log(err);
			res.render("signup-failure");
		} else {
			res.render("signin-success");
		}
	})
});

app.post("/api/signin", function (req, res) {

	console.log(req.body);

	User.findOne({name: req.body.name}, function (err, user) {

		if (err) {
			throw err;

		} else {

			if (user != null){
				
				if (req.body.pass === user.pass) {
					res.render("signin-success");
				
				} else {
					res.render("signin-failure");
				
				}
			} else {
				res.render("signin-failure");
			}
		}
	})
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

	      result.fromSite = Site.find({title: "Kotaku"}).select("_id");

	      console.log(result);

	      var entry = new Article(result);

	      entry.save(function(err, doc) {
	        if (err) {
	        	console.log(err);
	        }
	        else {
	        	Site.findOneAndUpdate({title: "Kotaku"}, {$push: {"articles":doc._id}}, {new: true}, function (err, newdoc) {
	        		if (err) {
	        			console.log(err);
	        		} else {
	        			console.log(newdoc);
	        		}
	        	});
	        	console.log(doc);
	        }
	      });

		});
	});
	res.send("Scrape Completed");
});


app.post("/api/comment", function (req, res) {

	res.json(req.body);
});



};