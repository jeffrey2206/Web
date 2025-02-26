const express = require('express');
const { addToCart, getCart, updateCart, removeFromCart, clearCart } = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/:id', verifyToken, updateCart);
router.delete('/:id', verifyToken, removeFromCart);
router.delete('/', verifyToken, clearCart);

module.exports = router;
