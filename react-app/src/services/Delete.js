// API to DELETE
import request from 'request';
import {ServerPath} from './Config';

const Delete = (path, data) => {
	const promise = new Promise((resolve, reject) => {
		request.delete({url: `${ServerPath}${path}`, form:{id: data}}, (err, httpResponse, body) => {
		 	if(err) reject(err);
		 	else resolve(body);
		});
	});

	return promise;
}

export default Delete;