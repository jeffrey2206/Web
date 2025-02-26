const express = require('express');
const { getDashboardData } = require('../controllers/dashboard.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, isAdmin, getDashboardData);

module.exports = router;
