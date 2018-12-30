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
    //  1. make a POST request with data for a new item
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
  });