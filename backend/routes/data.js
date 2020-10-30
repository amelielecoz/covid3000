const express = require('express');

const dataController = require('../controllers/data');

const router = express.Router();

// /datas => GET
router.get('/datas', dataController.getDatas);

module.exports = router;
