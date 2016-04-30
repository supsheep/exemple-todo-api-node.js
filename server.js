var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

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

app.post("/todos", function(req, res) {
});

app.listen(port, function() {
	console.log("express server started on " + port);
});