const router = require('express').Router();

router.use('/', require('./api'));

// 404 midleware
router.use((req, res, next) => {
	res.status(404).json({
		type: false,
		status: '404 Page Not Found'
	});
});

// 500 midleware
router.use((err, req, res, next) => {
	console.log(`Server error -> ${err}`);
	res.status(500).json({
		type: false,
		status: 'Internal Server Error',
		error: err
	});
});



module.exports = router;