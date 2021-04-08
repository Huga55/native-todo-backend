const supertest = require("supertest");
const expect = require("chai").expect;
const app = require("./index");
const api = supertest("http://localhost:3000");

const registerData = {
    email: "test@mail.ru",
    password: "asd",
}

//register user
describe("registration /register", function(done) {
    it("check return false and user alredy exists", function(done) {
        api.post("/register")
            .set("Content-Type", "application/json")
            .send(registerData)
            .end(function(error, response) {
                // console.log("error", error);
                // console.log("response", response.body);
                expect(response.status).to.equal(400);
                expect(response.body.success).to.equal(false);
                done();
            })
    })
})

const loginData = {
    email: "test@mail.ru",
    password: "asd",
}

//login with success
describe("auth /login", function(done) {
    it("auth user, return success and token", function(done) {
        api.post("/login")
            .set("Content-Type", "application/json")
            .send(loginData)
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body);
                expect(response.status).to.equal(200);
                expect(response.body.success).to.equal(true);
                done();
            })
    })
})

const loginDataError = {
    email: "test@mail.ru",
    password: "123",
}

//login with error
describe("auth /login", function(done) {
    it("auth user, return error", function(done) {
        api.post("/login")
            .set("Content-Type", "application/json")
            .send(loginDataError)
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body);
                expect(response.status).to.equal(400);
                expect(response.body.success).to.equal(false);
                done();
            })
    })
})

//check user with success
describe("/check", function(done) {
    it("check user and response true", function(done) {
        api.get("/check")
            .set("Content-Type", "application/json")
            .set("authorization", "asd")
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body);
                expect(response.status).to.equal(200);
                expect(response.body.success).to.equal(true);
                done();
            })
    })
})

//check user with false
describe("/check", function(done) {
    it("check user and response false", function(done) {
        api.get("/check")
            .set("Content-Type", "application/json")
            .set("authorization", "error")
            .end(function(error, response) {
                console.log("error", error);
                console.log("response", response.body);
                expect(response.status).to.equal(403);
                expect(response.body.success).to.equal(false);
                done();
            })
    })
})