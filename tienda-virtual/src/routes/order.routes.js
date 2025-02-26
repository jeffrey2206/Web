const express = require('express');
const { createOrder, getOrdersByUser, getOrderDetails, updateOrderStatus, cancelOrder } = require('../controllers/order.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrdersByUser);
router.get('/:id', verifyToken, getOrderDetails);
router.put('/:id', verifyToken, isAdmin, updateOrderStatus);
router.delete('/:id', verifyToken, cancelOrder);

module.exports = router;
