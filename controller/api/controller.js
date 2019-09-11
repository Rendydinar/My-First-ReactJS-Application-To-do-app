const mongoose = require('mongoose');
const TodoDB = require('../../models/todo')

const getAllTodo = () => (new Promise((resolve, reject) => {
	TodoDB.find((err, todoItem) => {
		if(err) reject(err);
		else resolve(todoItem);
	});
}));

const postNewTodo = (newTodo) => (new Promise((resolve, reject) => {
	newTodo.save((err, result) => {
		if(err) reject(err); 
		else resolve(result);
	});
}));

const updateTodo = (titleUpdate, descriptionUpdate, id) => (new Promise((resolve, reject) => {
	TodoDB.updateOne(
		{_id: id},
		{$set: {title: titleUpdate, description: descriptionUpdate}}, (err, result) => {
			if(err) reject(err);
			else resolve(result);
	});
}));

const deleteTodo = (id) => (new Promise((resolve, reject) => {
	TodoDB.deleteOne({_id: id}, (err, result) => {
		if(err) reject(err); 
		else resolve(result);
	});
}));

async function getAllData(req, res, next) {
	try {
		const resultGetAllData = await getAllTodo();
		console.log(resultGetAllData);

		res.status(200).json({
			type: true,
			status: 'GET ALL TODO OK',
			data: resultGetAllData
		});
	} catch(err) {
		next(err);
	}
}

async function postData(req, res, next) {
	try {
		const { title, description } = req.body;
		const newTodo = new TodoDB({
	        _id: new mongoose.Types.ObjectId,
	        title: String(title),
			description: String(description)
		});
		console.log(`Add todo -> ${title} ${description}`);
 		const resultPostData = await postNewTodo(newTodo);
		console.log(resultPostData);

		res.status(200).json({
			type: true,
			status: 'ADD TODO OK',
			data: resultPostData
		});
	} catch (err) {
		next(err);
	}
}

async function updateData(req, res, next) {
	try {
		const { title, description, _id } = req.body;
		console.log(`Update todo -> ${title} ${description} ${_id}`);

		const resultUpdateTodo = await updateTodo(title, description, _id);
		console.log(resultUpdateTodo);

		res.status(200).json({
			type: true,
			status: 'UPDATE TODO OK',
			data: resultUpdateTodo
		});
	} catch(err) {
		next(err);
	}
}

async function deleteData(req, res, next) {
	try {
		console.log(req.body);
		const { id } = req.body;
		console.log(`Delete todo id -> ${id}`);

		const resultDeleteTodo = await deleteTodo(id);
		console.log(resultDeleteTodo);

		res.status(200).json({
			type: true,
			status: 'DELETE TODO OK',
			data: resultDeleteTodo
		});
	} catch(err) {
		next(err);
	}
}

module.exports = {
	getAllData,
	postData,
	updateData,
	deleteData
}
