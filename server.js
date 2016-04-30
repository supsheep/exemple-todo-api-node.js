var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var todos = [{id: 1, description: "meet mom for lunch", completed: false},
{id: 2, description: "go to market", completed: false},
{id: 3, description: "go to work", completed: true}];

app.get("/", function(req, res) {
	res.send("Todo API root");
});

app.get("/todos", function(req, res) {
	res.json(todos);
});

app.get("/todos/:id", function(req, res) {
	var finded = false;

	for (i = 0; i < todos.length; i++) {
		if (todos[i].id == req.params.id) {
				finded = true;
				res.json(todos[i]);
			}
	}
	if (finded == false)
		res.status(404).send();
});

app.listen(port, function() {
	console.log("express server started on " + port);
});