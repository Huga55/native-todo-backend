const supertest = require("supertest");
const expect = require("chai").expect;
const app = require("./index");
const api = supertest("http://localhost:3000");

const elem = {
    idForGet: "606e9b4a3d73b637a0f8b4ee",
    idForDelete: "606e9e5340e42b1a4c00a588",
    type: "movie",
    data: {
        name: "Movie 3",
        description: "Descr 2",
    }
}

//POST add new elem
describe.skip("add new elem POST /section/movie/", function(done) {
    it("response success", function(done) {
        api.post(`/section/${elem.type}/`)
            .set("Content-Type", "application/json")
            .set("authorization", "asd")
            .send(elem.data)
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body);
                expect(response.status).to.equal(200);
                expect(response.body).deep.equal({success: true});
                done();
            })
    })
});


//GET all elems
describe.skip("get all elems GET", function(done) {
    it("response succes and data", function(done) {
        api.get(`/section/${elem.type}/`)
            .set("Content-Type", "application/json")
            .set("authorization", "asd")
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body.data.result);
                expect(response.status).to.equal(200);
                expect(response.body.success).to.equal(true);
                done();
            });
    })
});

//GET one elem
describe.skip("get one elem by id", function(done) {
    it("response success and one elem", function(done) {
        api.get(`/section/${elem.type}/${elem.idForGet}`)
            .set("Content-Type", "application/json")
            .set("authorization", "asd")
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body.data.result);
                expect(response.status).to.equal(200);
                expect(response.body.success).to.equal(true);
                done();
            })
    })
})

//PUT change one elem
describe.skip("change one elem by id", function(done) {
    it("response success true and get new elem", function(done) {
        api.put(`/section/${elem.type}`)
            .set("Content-Type", "application/json")
            .set("authorization", "asd")
            .send({...elem.data, id: elem.idForGet})
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body);
                expect(response.status).to.equal(200);
                expect(response.body.success).to.equal(true);
                done();
            })
    })
})

//DELETE one elem
describe.skip("delete one elem by id", function(done) {
    it("response success and id", function(done) {
        api.delete(`/section/${elem.type}/${elem.idForDelete}`)
            .set("Content-Type", "application/json")
            .set("authorization", "asd")
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body)
                expect(response.status).to.equal(200);
                expect(response.body.success).to.equal(true);
                done();
            })
    })
})