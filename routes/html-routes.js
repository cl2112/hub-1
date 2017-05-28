var Site = require("../models/site.js");
var Article = require("../models/article.js");
var Note = require("../models/note.js");
var User = require("../models/user.js");

module.exports = function(app) {

  	app.get("/", function(req, res) {
  		
  		Site.find({}, function (err, site) {
  			if (err) {
  				throw err;
  			}
  			
  			console.log(site);
  			
  			res.render("index", {site});
  		});

  	});

  	app.get("/signup", function(req, res){
  		res.render("signup");
  	})

  	app.get("/signin", function(req, res){
  		res.render("signin");
  	})

  	







  	app.get("/hub-2/:site", function (req,res) {

  		Site.findOne({title: req.params.site})
  		.populate("articles")
  		.exec(function (err, site) {

  			if (err) {
  				throw err;
  			} else {
  				
  				var article = site.articles;

  				res.render("hub-2", {article});
  			}
  		});
  	});





   	app.get("/hub-3/:article", function(req,res) {
    	Article.findOne({title: req.params.article})
    	.populate("notes")
    	.exec( function (err, article) {
    		if (err) {
    			throw err;
    		} else {
    			var note = article.notes;

    			res.render("hub-3", {note, article});
    		}
    	})
  	});




};
