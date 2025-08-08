const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser'); // used to parse JSON bodies
const cors = require('cors'); // used to enable CORS

const app = express(); // create an instance of express application
app.use(bodyParser.json()); // middleware to parse JSON request bodies
app.use(cors()); // middleware to enable CORS for all routes

const posts = {};  // going to store posts in temporal memory

app.get('/posts', (req, res) => {  // endpoint to get all posts
    res.send(posts);

});

app.post('/posts', (req, res) => {  // endpoint to create a new post
    const id = randomBytes(4).toString('hex');
    // will generate a random id for each post example 3hjwfhr
    const {title} = req.body; // assuming body-parser middleware is used

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]); // send back the newly created post
    // 201 is the status code for created resource
});

app.listen(4000, () => {  // start the server on port 4000
    console.log('Server is running on port 4000');
});