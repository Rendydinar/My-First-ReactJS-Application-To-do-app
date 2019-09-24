// API to PUT
import request from 'request';
import {ServerPath} from './Config';

const Put = (path, data) => {
	const promise = new Promise((resolve, reject) => {
		request.put({url: `${ServerPath}${path}`, form: data}, (err, httpResponse, body) => {
			if(err) reject(err);
			else resolve(body);
		});	
	});

	return promise;
}

export default Put;