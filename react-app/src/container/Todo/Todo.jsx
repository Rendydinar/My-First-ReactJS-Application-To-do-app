import React, {Component, Fragment} from 'react';
import './Todo.css';
import TodoList from '../../component/TodoList/TodoList';
// import request from 'request'; 
import API from '../../services';


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

	// get all todo in  API calling
	getPostAPI = () => {
		API.getAllTodo().then(result => {
			// parse to json format
 			result = JSON.parse(result);
			this.setState({
				todolist: result.data
			});
		});
	}

	handleTodoChange = (event) => {
		// handle when todo has change
		let newTodoForm = {...this.state.formTodo};
		newTodoForm[event.target.name] = event.target.value;

		this.setState({
			formTodo: newTodoForm
		});
	}

	postTodo = () => {
		// post todo in  API calling
		API.postNewTodo(this.state.formTodo).then(result => {
			this.getPostAPI();
			// clear the state
			this.setState({
				isUpdate: false,
				formTodo: {
					_id: 1,
					title: '',
					description: ''
				}
			});
		});
	}

	updateTodo = () => {
		// update todo in  API calling
		API.updateNewTodo(this.state.formTodo).then(result => {
			this.getPostAPI();
			// clear the state
			this.setState({
				isUpdate: false,
				formTodo: {
					_id: 1,
					title: '',
					description: ''
				}				
			});
		});
	}	

	deleteTodo = (id) => {
		// delete todo  in  API calling
		API.deleteTodo(id).then(result => {
			this.getPostAPI();
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
 