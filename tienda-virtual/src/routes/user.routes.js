const express = require('express');
const { getAllUsers, blockUser, deleteUser, updateUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllUsers);
router.put('/block/:id', verifyToken, isAdmin, blockUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);
router.put('/:id', verifyToken, isAdmin, updateUser); // Nueva ruta para actualizar usuarios

module.exports = router;
