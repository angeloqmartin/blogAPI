const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create(
    'What is CRUD?',
    'CRUD is the the four basic functions of persistent storage which are create, read, update, and delete',
    'anonymous'
);
BlogPosts.create(
    'Is Thinkful bootcamp legit?',
    'I have found thinkful helpful move forward with a career in devolpment.',
    'Reign'
);
BlogPosts.create(
    'My Blog API Challenge',
    'Challenge to re-enforce material such as CRUD',
    'Johe Doe'
);

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser,(req, res) => {
    const item = BlogPosts.create(
        req.body.title, 
        req.body.content, 
        req.body.author
        );
    res.status(201).json(item);
})

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    res.status(204).end();
})

router.put('/:id', (req, res) => {
    BlogPosts.update({
        id: req.params.id,
        title: req.params.id,
        content: req.body.content,
        author: req.body.author
});
    res.status(204).end();
})

module.exports = router;