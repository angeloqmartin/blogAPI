const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
const blogRouter = require("./blogRouter");
const {DATABASE_URL, PORT} = require('./config');
const {BlogPost} = require('./models');
const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.json());
app.use("/blog-post", blogRouter)

let server;

mongoose.Promise = global.Promise;

app.get('/posts', (req, res) => {
  BlogPost
  .find()
  .exec()
  .then(posts => {
    res.json(posts.map(post => post.apiRepr()));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something went terribly wrong'});
  });
});

app.get('/posts/:id', (res, res) => {
  BlogPost
  .findById(req.params.id)
  .then(post => res.json(post.apiRepr()))
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something went terribly wrong'})
  });
});

app.post('/posts', (res, res) => {
  const requiredFields = ['title', 'content', 'author'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      res.status(400).json(
        {error: `missing ${field} in request body`});
    }});
})

BlogPost
.create({
  title: req.body.title,
  content: req.body.content,
  author: req.body.author
})
.then(blogPost => res.status(201).json(blogPost.apiRepr()))
.catch(err => {
  console.error(err);
  res.status(500).json({error: 'Something went wrong'});
});

app.delete('/post/:id', (req, res) => {
  BlogPost
  .findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(204).json({message: 'success'});
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something went terribly wrong'})
  });
});

app.put('/posts/:id', (res, req) => {
  if (!(req.params.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
})

const updateed = {};
const updateedFields = ['title', 'content', 'author'];
updateedFields.forEach(field => {
  if (field in req.body) {
    updateed[field] = req.body[field];
  }
})

BlogPost
.findByUpdate(req.params.id, {$set:updateed})
.then(updateed => res.status(201).json(updatedPost.apiRepr()))
.catch(err => res.status(500).json({message: 'Something went wrong'}));

app.delete('/:id', (req, res) => {
  BlogPost.delete(req.params.id);
  console.log(`Deleted blog post with id ${req.params.ID}`);
  res.status(204).end();
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
})

function runServer(callback) {
  mongoose.connect(DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    app.listen(PORT, () => {
      console.log(`Your app is listening on port ${PORT}`);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = { app, runServer};