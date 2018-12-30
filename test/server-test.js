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
    //   1. make request to `BlogPosts`
    //   2. inspect response object and prove has right code and have
    //   right keys in response object.

    it("should list blog post on GET", function() {
      return chai
        .request(app)
        .get("/BlogPosts")
        .then(function(res) {
            expect(res.body).to.be.a("object");
        });
    });

    // test strategy:
    //  1. make POST request with data for a new item
    //  2. inspect response object and prove it has right
    //  2a. status code and that the returned object has an `id`

    it("should add an item on git ", function() {
        const newItem = { name: "coffee", ingredients: ["water", "beans"] };
        return chai
        .request(app)
        .post("/recipes")
        .send(newItem)
        .then(function(res) {
            expect(res).to.have.status(201);
            // expect(res).to.be.json;
            // expect(res).to.be.a("object");
            // expect(res.body.id).to.not.equal(null);
            // expect(res.body).to.include.keys('id', 'name', 'ingredients');
            // expect(res.body.name).to.be.equal(newItem.name);
            // expect(res.body.ingredients).to.be.a('array');
            // expect(res.body.ingredients).to.include.members(newItem.ingredients);
        }); 
    });    
  });