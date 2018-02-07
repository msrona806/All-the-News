// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************

// DEPENDANCIES
// =============================================================
var express = require("express"); 
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars'); 
var logger = require("morgan"); 
var mongoose = require("mongoose"); // database
var request = require("request");

// ========SCRAPING===========
//parses markup and provides an API for DOM traversal
var cheerio = require("cheerio");
var axios = require("axios");

// ==========EXPRESS==========
// server framework
var db = require('./models');
var PORT = 8080;
var app = express();

// =========MIDDLEWARE===========
// automatically logs requests, responses, data
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// ==========MONGOOSE============
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news");

// ========For HANDLEBARS========
// HTML template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ===========ROUTES==============

app.get("/", function (req, res) {
	res.render("index");
});

// GET route for scraping the National MS Society website
app.get("/scrape", function(req, res) {
  var url = "https://www.nationalmssociety.org/"
	request(url, function(err, resp, html) {

		// Load the html body from request into cheerio
			var $ = cheerio.load(html);

			$("article.article-item").each(function(i, body) {
				// Empty object to hold scraped articles 
				var result = {};
				result.title = $(body).find("h3").text();
				result.link = $(body).children().attr("href");
					
				// console.log(result);			
				
			// 	// Add the text and href of every link, and save them as properties of the result object
			// 	result.title = $(this)
			// 		.children("a")
			// 		.text();
			// 	result.link = $(this)
			// 		.children("a")
			// 		.attr("href");

					// Create a new Article using the `result` object built from scraping
					db.Article.create(result)
						.then(function(dbArticle) {
							// View the added result in the console
							console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
			res.json(err);
			
			res.send("Scrape Complete");
    });
});

			// 	// var article = $(body).find("itemprop");
			// 	var title = $(body).children("a").text();
			// 	var link = $(body).children("a").attr("href");
		
			// 	console.log(title);
			// 	console.log(link);
			// });
			// If we were able to successfully scrape and save an Article, send a message to the client
	
// ===========LISTENER===========
app.listen(PORT, function () {
	//Checking if port listens
	console.log("App listening on PORT " + PORT);
});

