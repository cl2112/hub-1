var Site = require("../models/site.js");
var Article = require("../models/article.js");

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
    	res.json({DidItWork: "yep"});
  	});




};
