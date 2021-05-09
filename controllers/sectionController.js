const path = require("path");
const Movie = require(path.join(__dirname, "..", "models", "movie"));
const Todo = require(path.join(__dirname, "..", "models", "todo"));
const Book = require(path.join(__dirname, "..", "models", "book"));
const { generalError } = require("./error");
const { validationResult } = require('express-validator');

const types = {
    movie: "movies",
    book: "books",
    todo: "todos"
}

const changeKeyId = (arr) => {
    return arr.map(e => {
        const { _id, name, description } = e.toObject();
        return {id: _id, name, description};
    });
}

exports.getAll = async (req, res) => {
    try {
        const userId = req.dataUser._id;

        const movies = await Movie.find({userId});
        const books = await Book.find({userId});
        const todos = await Todo.find({userId});

        return res.send({success: true, data: {movies: changeKeyId(movies), books: changeKeyId(books), todos: changeKeyId(todos)}});
    } catch(e) {
        generalError(e, res);
    }
}

exports.getOne = async (req, res) => {
    try {
        const userId = req.dataUser._id;
        const { type, id } = req.params;

        const handler = (result) => {
            if(result) {
                const { _id, name, description } = result.toObject();
                return res.send({success: true, data: {id: _id, name, description}});
            }
            return res.status(404).send({success: false, error: "Данный элемент не найден"});
        }

        switch(type) {
            case types.movie:
                const movie = await Movie.findOne({userId, _id: id});
                return handler(movie);
            case types.book:
                const book = await Book.findOne({userId, _id: id});
                return handler(book);
            case types.todo:
                const todo = await Todo.findOne({userId, _id: id});
                return handler(todo)
            default:
                return res.status(404).send({success: false, error: "Данный раздел не найден"});
        }
    } catch(e) {
        generalError(e, res);
    }
}

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
        }

        const userId = req.dataUser._id;
        const { type } = req.params;
        const data = req.body;

        const handler = (result) => {
            if(result) {
                const {_id, name, description} = result.toObject();
                return res.send({success: true, data: {id: _id, name, description}});
            }
            return res.status(404).send({success: false, error: "Данный элемент не найден"});
        }

        switch(type) {
            case types.movie:
                const movie = new Movie({...data, userId});
                const newMovie = await movie.save();
                return handler(newMovie);
            case types.book:
                const book = new Book({...data, userId});
                const newBook = await book.save();
                return handler(newBook);
            case types.todo:
                const todo = new Todo({...data, userId});
                const newTodo = await todo.save();
                return handler(newTodo);
            default:
                return res.status(404).send({success: false, error: "Данный раздел не найден"});
        }
    } catch(e) {
        generalError(e, res);
    }
}

exports.change = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
        }

        const userId = req.dataUser._id;
        const { type } = req.params;
        const { id, ...data } = req.body;

        const handler = (result) => {
            if(result) {
                const {_id, name, description} = result;
                return res.send({success: true, data:{id: _id, name, description}});
            }
            return res.status(404).send({success: false, error: "Данный элемент не найден"});
        }

        switch(type) {
            case types.movie:
                const movie = await Movie.findOneAndUpdate({userId, _id: id}, {...data}, {new: true});
                return handler(movie);
            case types.book:
                const book = await Book.findOneAndUpdate({userId, _id: id}, {...data}, {new: true});
                return handler(book);
            case types.todo:
                const todo = await Todo.findOneAndUpdate({userId, _id: id}, {...data}, {new: true});
                return handler(todo);
            default:
                return res.status(404).send({success: false, error: "Данный раздел не найден"});
        }
    } catch(e) {
        generalError(e, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const userId = req.dataUser._id;
        const { type, id } = req.params;

        const handler = (id) => {
            if(!id) {
                return res.status(404).send({success: false, error: "Данный элемент не найден"});
            }
            return res.send({success: true, data: {id}});
        }

        switch(type) {
            case types.movie:
                const movie = await Movie.findOneAndDelete({userId, _id: id});
                return handler(movie._id);
            case types.book:
                const book = await Book.findOneAndDelete({userId, _id: id});
                return handler(book._id);
            case types.todo:
                const todo = await Todo.findOneAndDelete({userId, _id: id});
                return handler(todo._id);
            default:
                return res.status(404).send({success: false, error: "Данный раздел не найден"});
        }
    } catch(e) {
        generalError(e, res);
    }
}