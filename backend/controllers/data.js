const Data = require('../models/data');

exports.getDatas = async (req, res, next) => {
	try {
		const datas = await Data.find();
		
		res.status(200).json({
			message: 'Fetched datas successfully.',
			datas: datas,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};