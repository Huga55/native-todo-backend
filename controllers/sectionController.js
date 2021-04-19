const path = require("path");
const Movie = require(path.join(__dirname, "..", "models", "movie"));
const Todo = require(path.join(__dirname, "..", "models", "todo"));
const Book = require(path.join(__dirname, "..", "models", "book"));
const { generalError } = require("./error");

const types = {
    movie: "movie",
    book: "book",
    todo: "todo"
}

exports.getAll = async function(req, res) {
    try {
        const userId = req.dataUser._id;

        const movies = await Movie.find({userId});
        const books = await Book.find({userId});
        const todos = await Todo.find({userId});

        return res.send({success: true, data: {movies, books, todos}});
    } catch(e) {
        generalError(e);
    }
}

exports.getOne = function(request, response) {
    const userId = request.dataUser._id;
    const { type, id } = request.params;

    const handler = (err, result) => {
        if(err) return response.status(400).send({success: false, error});

        return response.send({success: true, data: {result}});
    }

    switch(type) {
        case types.movie: 
            Movie.findOne({userId}, handler);
            break;
        case types.book:
            break;
        case types.todo:
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
    }
}

exports.create = function(request, response) {
    if(!request.body || Object.keys(request.params).length == 0) response.status(400).send({success: false, error: "Data not found"});
    const userId = request.dataUser._id;
    const { type } = request.params;
    const data = request.body;

    const handler = (err) => {
        if(err) return response.status(400).send({success: false, error});

        return response.send({success: true});
    }

    switch(type) {
        case types.movie:
            const movie = new Movie({...data, userId});
            movie.save(handler);
            break;
        case types.book:
            break;
        case types.todo:
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
    }
}

exports.change = function(request, response) {
    if(!request.body || Object.keys(request.params).length == 0) response.status(400).send({success: false, error: "Data not found"});
    const userId = request.dataUser._id;
    const { type } = request.params;
    const { id, ...data } = request.body;

    const handler = (err, result) => {
        if(err) return response.status(400).send({success: false, error});

        if(result) {
            return response.send({success: true, data:{result}});
        }
        return response.status(400).send({success: false});
    }

    switch(type) {
        case types.movie:
            Movie.findOneAndUpdate({userId, _id: id}, {...data}, {new: true}, handler);
            break;
        case types.book:
            break;
        case types.todo:
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
    }
}

exports.delete = function(request, response) {
    const userId = request.dataUser._id;
    const { type, id } = request.params;

    const handler = (err, result) => {
        if(err) return response.status(400).send({success: false, error});

        return response.send({success: true, data: {id: result._id}});
    }

    switch(type) {
        case types.movie:
            Movie.findOneAndDelete({userId, _id: id}, handler);
            break;
        case types.book:
            break;
        case types.todo:
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
    }
}