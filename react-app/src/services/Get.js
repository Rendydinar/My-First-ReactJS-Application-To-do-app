// API to GET 
import request from 'request';
import {ServerPath} from './Config';

const Get = (path) => {
	const promise = new Promise((resolve, reject) => {
		request({url: `${ServerPath}${path}`}, (err, httpResponse, body) => {
			if(err) reject(err);
			else resolve(body);
		});
	});
	return promise;
}
export default Get;

