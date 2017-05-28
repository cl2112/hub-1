console.log("hub-1.js loaded.");

var userBrowserID = localStorage.getItem("userBrowserID");

function setUserBrowserID() {
	// console.log("setUserBrowserID");

	createRandomID(function(ID) {

		// console.log("callback ID", ID);

		IDString = ID.toString();

		localStorage.userBrowserID = IDString;
	});
};

function createRandomID( callback ) {

	// console.log("createRandomID");

	var ID = "";

	var array = new Uint32Array(10);
	
	window.crypto.getRandomValues(array);
	
	for (var i = 0; i < array.length; i++) {
		ID += array[i];
	}

	callback(ID);
};


if (userBrowserID === null) {
	// console.log("userBrowserID === null");
	setUserBrowserID();
} else if (userBrowserID === undefined) {
	// console.log("userBrowserID === undefined");
} else {
	// console.log("userBrowserID //else");
	// console.log(userBrowserID);
	// User's browser already has an ID from Hub-1
}
