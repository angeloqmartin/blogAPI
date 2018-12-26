// app requirements => 

// > Use npm init to initialize your project
// > Install uuid (Node package) run npm install uuid within 
// > App should support the four CRUD operations for a blog posts resource
    // GET and POST requests should go to /blog-posts.
    // DELETE and PUT requests should go to /blog-posts/:id.
// > Use Express router and modularize routes to /blog-posts
// > Add a couple of blog posts on server load

// Note => 

// to create a new blog post, supply a title, content, an author name
// and (optionally) a publication date

const express = require('express')

const app = express();

const uuid = require('uuid');

// This module provides volatile storage, using a `BlogPost`
// model. We haven't learned about databases yet, so for now
// we're using in-memory storage. This means each time the app stops, our storage
// gets erased.

// Don't worry too much about how BlogPost is implemented.
// Our concern in this example is with how the API layer
// is implemented, and getting it to use an existing model.


function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const BlogPosts = {
  create: function(title, content, author, publishDate) {
    const post = {
      id: uuid.v4(),
      title: title,
      content: content,
      author: author,
      publishDate: publishDate || Date.now()
    };
    this.posts.push(post);
    return post;
  },
  get: function(id=null) {
    // if id passed in, retrieve single post,
    // otherwise send all posts.
    if (id !== null) {
      return this.posts.find(post => post.id === id);
    }
    // return posts sorted (descending) by
    // publish date
    return this.posts.sort(function(a, b) {
      return b.publishDate - a.publishDate
    });
  },
  delete: function(id) {
    const postIndex = this.posts.findIndex(
      post => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    }
  },
  update: function(updatedPost) {
    const {id} = updatedPost;
    const postIndex = this.posts.findIndex(
      post => post.id === updatedPost.id);
    if (postIndex === -1) {
      throw new StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.posts[postIndex] = Object.assign(
      this.posts[postIndex], updatedPost);
    return this.posts[postIndex];
  }
};

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

app.get('/blog-post', (res, req) => {
  res.json(BlogPosts.get());
});

function createBlogPostsModel() {
  const storage = Object.create(BlogPosts);
  storage.posts = [];
  return storage;
}


module.exports = {BlogPosts: createBlogitgPostsModel()};