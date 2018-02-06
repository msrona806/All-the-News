// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************

// DEPENDANCIES
// =============================================================
var express = require("express");
var exphbs = require('express-handlebars');

// ========Initializing EXPRESS========
var app = express();
var PORT = 8080;

// ========For HANDLEBARS========
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//     ROUTES
// =============================================================
// require("./routes/api-routes.js")(app);
app.get("/", function (req, res) {
	res.render("index");

	// res.json({
	// 	message: "Hello World"
	// });
});

// Static directory
// app.use(express.static("views"));

//// ========the LISTENER========
app.listen(PORT, function () {
	//Checking if port listens
	console.log("App listening on PORT " + PORT);
});

