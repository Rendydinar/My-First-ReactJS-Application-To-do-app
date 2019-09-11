import React from 'react';

const TodoList = (props) => {
	return(
		<div className="post">
				<div className="img-thumb">

				</div>
				<div className="content"> 
					<p className="title">{props.data.title}</p>
					<p className="desc">{props.data.description}</p>
					<button className="update" onClick={() => props.delete(props.data._id)}>Delete</button>
					<button className="remove" onClick={() => props.update(props.data)} >Update</button>
				</div>
			</div>		
 	);  
}

export default TodoList;