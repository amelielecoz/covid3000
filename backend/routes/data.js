const express = require('express');

const dataController = require('../controllers/data');

const router = express.Router();

// /datas => GET
router.get('/datas', dataController.getDatas);

// /datas => GET
router.get('/today', dataController.getTodayDatas);

// /datas => GET
router.get('/hospitals', dataController.getHospitals);


// /datas => GET
// router.get('/dep-13', dataController.getDepBdr);

module.exports = router;
