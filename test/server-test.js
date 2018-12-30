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
        });
    });  
  });