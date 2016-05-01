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
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty("completed") && queryParams.completed == "true")
		filteredTodos = _.where(filteredTodos, {completed: true});
	else if (queryParams.hasOwnProperty("completed") && queryParams.completed == "false")
		filteredTodos = _.where(filteredTodos, {completed: false});
	res.json(filteredTodos);
});

app.get("/todos/:id", function(req, res) {
	var matchedTodo = _.findWhere(todos, {id: parseInt(req.params.id)});

	if (matchedTodo)
		res.json(matchedTodo);
	else
		res.status(404).send();
});

app.post("/todos", function(req, res) {
	var body = _.pick(req.body, "description", "completed");
	
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).send();
	}
	body.description = body.description.trim();
	body.id = todoNextId;
	todos.push(body);
	todoNextId++;
	res.json(todos[todos.length - 1]);
});

app.delete("/todos/:id", function(req, res) {
	var matchedTodo = _.findWhere(todos, {id: parseInt(req.params.id)});
	
	if (matchedTodo === undefined)
		res.status(404).send();
	else {
		todos = _.without(todos, matchedTodo);
		res.status(200).send();
	}
});

app.put("/todos/:id", function(req, res) {
	var matchedTodo = _.findWhere(todos, {id: parseInt(req.params.id)});
	
	if (matchedTodo) {
		var body = _.pick(req.body, "description", "completed");
		var validAttributes = {};
		
		if (body.hasOwnProperty("completed") && _.isBoolean(body.completed))
			validAttributes.completed = body.completed;
		else if (body.hasOwnProperty("completed"))
			return res.status(400).send();
			
		if (body.hasOwnProperty("description") && _.isString(body.description) && body.description.trim().length > 0)
			validAttributes.description = body.description;
		else if (body.hasOwnProperty("description"))
			return res.status(400).send();	

		_.extend(matchedTodo, validAttributes);
		res.json(matchedTodo);
	} else
		res.status(404).send();
});

app.listen(port, function() {
	console.log("express server started on " + port);
});