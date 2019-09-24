// di file ini adalah kumpulan dari semua action calling API.
// file ini digunakan khusus untuk kita memantau calling API kita.

import Get from './Get';
import Post from './Post';
import Delete from './Delete';
import Put from './Put';


// GET
const getAllTodo = () => Get('/todo');
// POST
const postNewTodo = (data) => Post('/todo', data);
// PUT
const updateNewTodo = (data) => Put(`/todo`, data);
// DELETE
const deleteTodo = (data) => Delete('/todo', data); 

const API = {
	getAllTodo,
	postNewTodo,
	updateNewTodo,
	deleteTodo
}

export default API;

