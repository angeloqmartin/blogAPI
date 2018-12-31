const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, runServer, closeServer } = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Shopping List", function() {
    before(function() {
      return runServer();
    });
    after(function() {
      return closeServer();
    });
    
    // test strategy:
    //   1. make request to `/blog-post`
    //   2. inspect response object and prove has right code and have
    //   right keys in response object.

    it("should list blog post on GET", function() {
      return chai
        .request(app)
        .get("/blog-post")
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("array");
            expect(res).to.be.json;
            expect(res.body.length).to.be.at.least(1);
            const expectedKeys = ["id", "title", "content", "author"];
            res.body.forEach(function(item) {
              expect(item).to.be.a("object");
              expect(item).to.include.keys(expectedKeys);
            });
        });
    });  

    // test strategy:
    //  1. make a POST request with data for a new Blog Post
    //  2. inspect response object and prove it has right
    //  status code and that the returned object has an `id`

    it("should add an blog post POST", function() {
        const newBlogPost = {title: "test for POST", content: "test passed", author: "root"}
        return chai
        .request(app)
        .post("/blog-post")
        .send(newBlogPost).then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("title", "content", "author");
            expect(res.body.id).not.to.equal(null);
        });
    });

    // test strategy:
    //  1. initialize some update data 
    //  2. make a GET request so we can get an blog post to update
    //  3. add `id` to `updateData`
    //  4. Make a PUT request with `updateData`
    //  5. Inspect the response object to ensure it
    //  has right status code and that we get back an updated
    //  item with the right data in it.

    it("should update blog posts on PUT", function() {
        const updatePost = {
            name: "New post",
            content: "here lies new content to test"
        }
        return chai
        .request(app)
        .get("/blog-post").then(function(res) {
            updatePost.id = res.body[0].id;

            // will return promise whose value will be the response object
            // which we can inspect in the next `then` block 
            return chai
            .request(app)
            .put(`/blog-post/${updatePost.id}`)
            .send(updatePost);
        })
        .then(function(res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a("object");
            // expect(res.body).to.equal(updatePost);
        })
    })

    // test strategy:
    //  1. GET shopping list items so we can get ID of one
    //  to delete.
    //  2. DELETE an item and ensure we get back a status 204

    it("should delete blog post on DELETE", function() {
        return chai
        .request(app)
        .get("/blog-post")
        .then(function(res){
            return chai.request(app)
            .delete(`/blog-post/${res.body[0].id}`)
        })
        .then(function(res) {
            expect(res).to.have.status(204);
        });
    });
});