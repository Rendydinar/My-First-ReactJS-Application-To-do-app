import React, {Component, Fragment} from 'react';
import './Todo.css';
import TodoList from '../../component/TodoList/TodoList';
import request from 'request'; 

const serverUrl = 'http://localhost:8080/todo';

class Todo extends Component {

 	state = {
		todolist: [],
		formTodo: {
			id: 1,
			title: '',
			description: ''
		},
		isUpdate: false
	};

	getPostAPI = () => {
		// request to server 
		request({url: serverUrl}, (err, httpResponse, body) => {
 			if(err) console.log(`Error -> : ${err}`);
			else {
				body = JSON.parse(body)
				this.setState({
					todolist: body.data
				});				
			}
		});
	}

	handleTodoChange = (event) => {
		let newTodoForm = {...this.state.formTodo};
		newTodoForm[event.target.name] = event.target.value;

		this.setState({
			formTodo: newTodoForm
		});
	}

	postTodo = () => {
		console.log(this.state.formTodo);
		request.post({url: 'http://localhost:8080/todo', form: this.state.formTodo}, (err, httpResponse, body) =>{
			console.log(httpResponse);
			if(err) console.log(`Error -> : ${err}`);
			else {
				this.getPostAPI();
				this.setState({
					isUpdate: false,
					formTodo: {
						_id: 1,
						title: '',
						description: ''
					}
				});
			}
 		});
	}

	updateTodo = () => {
		console.log(this.state.formTodo);
		request.put({url: serverUrl, form: this.state.formTodo}, (err, httpResponse, body) => {
			if(err) console.log(`Error -> : ${err}`);
			else {
				this.getPostAPI();
				this.setState({
					isUpdate: false,
					formTodo: {
						id: 1,
						title: '',
						description: ''
					}
				});
			}
		});
	}	

	deleteTodo = (id) => {
		console.log(`delete ${id}`);
			const _id = {id: id}
		console.log(_id);

		 request.delete({url: serverUrl, form:{id: id}}, (err, httpResponse, body) => {
		 	if(err) console.log(`Error -> : ${err}`);
		 	else this.getPostAPI();
		 });
	}	

	handleSubmitTodo = () => {
		if(this.state.isUpdate) {
			console.log('update');
			this.updateTodo();
		} else {
			console.log('post todo');
			this.postTodo();
		}
	}

	handleUpdateTodo = (todoUpdate) => {
		this.setState({
			formTodo: todoUpdate,
			isUpdate: true
		});
	}

	componentDidMount() {
		this.getPostAPI();
	}
	
	render() {
		return (
			<Fragment>
				<p className="section-title">My Todo</p>
				<div className="form-add-todo">
					<label htmlFor="title">Title</label>
					<input type="text" value={this.state.formTodo.title} name="title" placeholder="Todo title" onChange={this.handleTodoChange}/>
					<label htmlFor="body">Description</label>
					<textarea name="description" value={this.state.formTodo.description} id="body" cols="30" rows="10" placeholder="Todo description" onChange={this.handleTodoChange}></textarea>						
					<button className="btn-submit" onClick={this.handleSubmitTodo}>Add Todo</button>
				</div>
				{
					this.state.todolist.map(todo => {
						return	<TodoList key={todo._id} data={todo} delete={this.deleteTodo} update={this.handleUpdateTodo}/>
					})
				}
			</Fragment>
 		)
	}
};

export default Todo;
 