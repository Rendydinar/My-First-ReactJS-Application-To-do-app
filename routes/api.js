const router = require('express').Router();
const apiController = require('../controller/api/controller');

// app routing
router.get('/todo', (req, res, next) => {
	apiController.getAllData(req, res, next);
}); 
router.post('/todo', (req, res, next) => {
	apiController.postData(req, res, next);
});
router.put('/todo', (req, res, next) => {
	apiController.updateData(req, res, next)
});
router.delete('/todo', (req, res, next) => {
	apiController.deleteData(req, res, next);
});

module.exports = router;
