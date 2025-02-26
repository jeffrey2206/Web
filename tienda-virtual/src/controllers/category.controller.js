const Category = require('../models/category.model');

exports.createCategory = (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });

    Category.createCategory(name, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Categoría creada' });
    });
};

exports.getCategories = (req, res) => {
    Category.getCategories((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    Category.updateCategory(id, name, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Categoría actualizada' });
    });
};

exports.deleteCategory = (req, res) => {
    const { id } = req.params;

    Category.deleteCategory(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Categoría eliminada' });
    });
};
