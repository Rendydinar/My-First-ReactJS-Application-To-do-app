// API to POST
import request from 'request';
import {ServerPath} from './Config';

const Post = (path, data) => {
	const promise = new Promise((resolve, reject) => {
		request.post({url:`${ServerPath}${path}`, form: data}, (err, httpResponse, body) =>{
			if(err) reject(err);
			else resolve(body);
	 	});
	});
 	return promise;
}
export default Post;
