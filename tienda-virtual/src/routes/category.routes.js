const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getCategories);
router.post('/', verifyToken, isAdmin, createCategory);
router.put('/:id', verifyToken, isAdmin, updateCategory);
router.delete('/:id', verifyToken, isAdmin, deleteCategory);

module.exports = router;
