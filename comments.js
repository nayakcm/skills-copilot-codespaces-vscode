// create web server 
// create a route for comments
// create a route for new comment
// create a route for delete comment

var express = require('express');
var comments = require('./comments');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
    res.json(comments.getComments());
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    comments.addComment(comment);
    res.json(comments.getComments());
});

app.delete('/comments/:id', function(req, res) {
    var id = req.params.id;
    comments.deleteComment(id);
    res.json(comments.getComments());
});

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});