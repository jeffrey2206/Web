const express = require('express');
const { getAllUsers, blockUser, deleteUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllUsers);
router.put('/block/:id', verifyToken, isAdmin, blockUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
