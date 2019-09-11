const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
    	type: String,
    	required: true
    },
    description: {
    	type: String,
    	required: true
    }
});

const todo = mongoose.model('todo', TodoSchema);

module.exports = todo;

