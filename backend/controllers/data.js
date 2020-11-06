const Data = require('../models/data');
const moment = require('moment'); // require
moment().format(); 

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

exports.getTodayDatas = async (req, res, next) => {
	try {
		const datas = await Data.find({'jour': '2020-10-29'});
		
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


exports.getDepBdr = async (req, res, next) => {
	try {
		const datas = await Data.find({'dep': 13});
		
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

exports.getHospitals = async (req, res, next) => {
	let lastDays = 10;
	let sexe = 0;
	let departement = null;

	if (req.query.lastDays) {
		lastDays = req.query.lastDays;
	}

	if (req.query.sexe) {
		sexe = req.query.sexe;
	}

	if (req.query.dep) {
		departement = req.query.dep;
		if(Number(departement) >= 10) departement = Number(departement);
	}

	const limit = moment().subtract(lastDays, 'days');

	try {
		const datas = await Data.find(
			{
				// 'jour': {$gt: limit},
				'sexe': sexe,
			}
		)
		if(departement) {
			return datas = await Data.find(
				{
					// 'jour': {$gt: limit},
					'sexe': sexe,
					'dep': departement,
				}
			)
		} 
		

		
		
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