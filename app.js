const express = require('express');
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/todo-app-reactjs';
const PORT = process.env.PORT || 8080;
const HOST = 'localhost';
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const helmet = require('helmet');

// app midleware
app.use(bodyParse.urlencoded({extended: false}));
app.use(helmet());
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
	// setup app CORS
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, (err, result) => {
	if(err) {
		res.json({
			type: false,
			status: 500,
			error: 'database cannot running'
		});
	} else {
		app.use(require('./routes'));
	}
});

app.listen(PORT,HOST, () => console.log(`server running on port ${PORT}`));
  
  