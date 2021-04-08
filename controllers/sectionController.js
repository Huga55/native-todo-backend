const path = require("path");
const Movie = require(path.join(__dirname, "..", "models", "movie"));

exports.getAll = function(request, response) {
    const userId = request.dataUser._id;
    const { type } = request.params;

    const handler = (err, result) => {
        if(err) return response.status(400).send({success: false, error});

        return response.send({success: true, data: {result}});
    }

    switch(type) {
        case "movie": 
            Movie.find({userId}, handler);
            break;
        case "book":
            break;
        case "todo":
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
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
        case "movie": 
            Movie.findOne({userId}, handler);
            break;
        case "book":
            break;
        case "todo":
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
        case "movie":
            const movie = new Movie({...data, userId});
            movie.save(handler);
            break;
        case "book":
            break;
        case "todo":
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
        case "movie":
            Movie.findOneAndUpdate({userId, _id: id}, {...data}, {new: true}, handler);
            break;
        case "book":
            break;
        case "todo":
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
    }
}

exports.delete = function(request, response) {
    const userId = request.dataUser._id;
    const { type, id } = request.params;

    const handler = (err) => {
        if(err) return response.status(400).send({success: false, error});

        return response.send({success: true});
    }

    switch(type) {
        case "movie":
            Movie.findOneAndDelete({userId, _id: id}, handler);
            break;
        case "book":
            break;
        case "todo":
            break;
        default:
            return response.status(400).send({success: false, error: "This type was not found."});
    }
}