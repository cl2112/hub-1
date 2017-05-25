module.exports = function(app) {

  	app.get("/", function(req, res) {
    	res.render("index");
  	});

  	app.get("/signup", function(req, res){
  		res.render("signup");
  	})

  	app.get("/signin", function(req, res){
  		res.render("signin");
  	})

  	







  	app.get("/hub-2/:site", function(req,res) {
	  	res.json({DidItWork: "yep"});
  	});





   	app.get("/hub-3/:article", function(req,res) {
    	res.json({DidItWork: "yep"});
  	});




};
