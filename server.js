var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var todos = [{id: 1, description: "meet mom for lunch", completed: false},
{id: 2, description: "go to market", completed: false}];

app.get("/", function(req, res) {
	res.send("Todo API root");
});

app.get("/todos", function(req, res) {
	res.json(todos);
});

app.listen(port, function() {
	console.log("express server started on " + port);
});