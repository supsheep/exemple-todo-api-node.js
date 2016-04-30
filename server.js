var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var app = express();
var port = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.send("Todo API root");
});

app.get("/todos", function(req, res) {
	res.json(todos);
});

app.get("/todos/:id", function(req, res) {
	var matchedTodo = _.findWhere(todos, {id: parseInt(req.params.id)});

	if (matchedTodo)
		res.json(matchedTodo);
	else
		res.status(404).send();
});

app.post("/todos", function(req, res) {
	var body = req.body;
	
	if (!_.isBool(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).send();
	}
	body.id = todoNextId;
	todos.push(body);
	todoNextId++;
	res.json(todos[todos.length - 1]);
});

app.listen(port, function() {
	console.log("express server started on " + port);
});