const express = require('express');
const router = express.Router();

t; vvcconst {BlogPosts} = require('./models');

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

router.post('/',(req, res) => {
    const requiredFields = ["title", "content", "author"];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(
        req.body.title, 
        req.body.content, 
        req.body.author
        );
    res.status(201).json(item);
})

router.put('/:id', (req, res) => {
    const requiredFields = ["id", "title", "content", "author", "publishDate"];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = `Request path id (${
        req.params.id
      }) and request body id ``(${req.body.id}) must match`;
      console.error(message);
      return res.status(400).send(message);
    }  
    console.log(`Updating blog post with id \`${req.params.id}\``);
    BlogPosts.update({
        id: req.params.id,
        title: req.params.id,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
});
    res.status(204).end();
})

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post with id \`${req.params.ID}\``);
    res.status(204).end();
})

module.exports = router;