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

// app.post("/api/signup", function (req, res) {

// 	console.log(req.body);

// 	var info = {}

// 	info.name = req.body.name;
// 	info.pass = req.body.pass;
// 	info.userBrowserID = req.body.userBrowserID;

// 	var entry = new User(info);

// 	entry.save(function(err, user) {
// 		if (err) {
// 			console.log(err);
// 			res.render("signup-failure");
// 		} else {
// 			res.render("signin-success");
// 		}
// 	})
// });

// app.post("/api/signin", function (req, res) {

// 	console.log(req.body);

// 	User.findOne({name: req.body.name}, function (err, user) {

// 		if (err) {
// 			throw err;

// 		} else {

// 			if (user != null){
				
// 				if (req.body.pass === user.pass) {
// 					res.render("signin-success");
				
// 				} else {
// 					res.render("signin-failure");
				
// 				}
// 			} else {
// 				res.render("signin-failure");
// 			}
// 		}
// 	})
// });

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
	res.redirect("/");
});


app.get("/api/scrape/PC-Gamer", function (req, res) {
  	request("http://www.pcgamer.com/news/", function(error, response, html) {
	    
	    var $ = cheerio.load(html);
	    $("div.listingResult").each(function(i, element) {

	      var result = {};

	      result.title = $(this).children("a").children("article").children("div.content").children("header").children("h3").text();
	      result.link = $(this).children("a").attr("href");

	      result.pic = $(this).children("a").children("article").children("div").children("figure").attr("data-original");
	      result.blurb = $(this).children("a").children("article").children("div.content").children("p").text();

	      result.fromSite = Site.find({title: "PC-Gamer"}).select("_id");

	      console.log(result);

	      var entry = new Article(result);

	      entry.save(function(err, doc) {
	        if (err) {
	        	console.log(err);
	        }
	        else {
	        	Site.findOneAndUpdate({title: "PC-Gamer"}, {$push: {"articles":doc._id}}, {new: true}, function (err, newdoc) {
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
	res.redirect("/");
});



app.post("/api/comment", function (req, res) {
	
	var comment = {};

	comment.text = req.body.comment;

	var entry = new Note(comment);

	entry.save( function (err, doc) {
	
		if (err) {
			throw err;		
		} else {
			
			Article.findOneAndUpdate({_id: req.body.articleID}, {$push: {"notes":doc._id}}, {new: true}, function (err, newdoc) {
	        	if (err) {
	        		console.log(err);
	        	} else {
	        		console.log(newdoc);
	        		res.redirect("back");
	        	}
	        });	
	    }    	
	});
});



app.post("/api/note/delete", function ( req, res ) {

	// console.log(req.body.noteID);

	Note.remove({_id: req.body.noteID}, function (err) {
		if (err) {
			throw err;
		} else {
			console.log("Comment deleted.");
			
			res.redirect("back");
		}
	});
});


// End of Export Obj
};