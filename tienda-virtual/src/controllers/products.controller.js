const db = require('../config/database');

exports.getProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

const Product = require('../models/product.model');

// Crear un producto
exports.createProduct = (req, res) => {
    const { name, description, price, stock, category, image } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }

    Product.createProduct(name, description, price, stock, category, image, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto creado exitosamente' });
    });
};

// Obtener todos los productos
exports.getProducts = (req, res) => {
    let { page, limit, category, minPrice, maxPrice, search, sortBy, order } = req.query;

    // Valores predeterminados
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    order = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let offset = (page - 1) * limit;
    let sql = 'SELECT * FROM products WHERE 1=1';
    let params = [];

    // Filtrar por categoría
    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    // Filtrar por precio mínimo
    if (minPrice) {
        sql += ' AND price >= ?';
        params.push(parseFloat(minPrice));
    }

    // Filtrar por precio máximo
    if (maxPrice) {
        sql += ' AND price <= ?';
        params.push(parseFloat(maxPrice));
    }

    // Búsqueda por nombre o descripción
    if (search) {
        sql += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    // Ordenar por campo específico (name, price, stock, etc.)
    if (sortBy) {
        sql += ` ORDER BY ${sortBy} ${order}`;
    }

    // Agregar paginación
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Obtener el total de productos sin paginación
        db.query('SELECT COUNT(*) AS total FROM products', (err, countResults) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                total: countResults[0].total,
                page,
                limit,
                products: results
            });
        });
    });
};


// Obtener producto por ID
exports.getProductById = (req, res) => {
    const { id } = req.params;
    
    Product.getProductById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(results[0]);
    });
};

// Actualizar producto
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category, image } = req.body;

    Product.updateProduct(id, name, description, price, stock, category, image, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto actualizado correctamente' });
    });
};

// Eliminar producto
exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.deleteProduct(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto eliminado correctamente' });
    });
};

