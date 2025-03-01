// Create web server 
// 1. Create a web server
// 2. Create a route for POST /comments
// 3. Create a route for GET /comments
// 4. Create a route for DELETE /comments/:id
// 5. Create a route for PUT /comments/:id
// 6. Create a route for PATCH /comments/:id
// 7. Create a route for GET /comments/:id

const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
    const newComment = req.body;
    newComment.id = uuidv4();
    comments.push(newComment);
    fs.writeFileSync('./data/comments.json', JSON.stringify(comments, null, 2));
    res.status(201).send(newComment);
});

app.get('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
    res.status(200).send(comments);
});

app.delete('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
    const filteredComments = comments.filter(comment => comment.id !== req.params.id);
    fs.writeFileSync('./data/comments.json', JSON.stringify(filteredComments, null, 2));
    res.status(200).send({ message: 'Comment deleted successfully' });
});

app.put('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
    const updatedComments = comments.map(comment => {
        if (comment.id === req.params.id) {
            return { ...comment, ...req.body, id: req.params.id };
        }
        return comment;
    });
    fs.writeFileSync('./data/comments.json', JSON.stringify(updatedComments, null, 2));
    res.status(200).send({ message: 'Comment updated successfully' });
});

app.patch('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
    const updatedComments = comments.map(comment => {
        if (comment.id === req.params.id) {
            return { ...comment, ...req.body, id: req.params.id };
        }
        return comment;
    });
    fs