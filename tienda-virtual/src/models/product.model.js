const db = require('../config/database');

exports.createProduct = (name, description, price, stock, category, image, callback) => {
    const sql = 'INSERT INTO products (name, description, price, stock, category, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, price, stock, category, image], callback);
};

exports.getProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

exports.getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

exports.updateProduct = (id, name, description, price, stock, category, image, callback) => {
    const sql = 'UPDATE products SET name=?, description=?, price=?, stock=?, category=?, image=? WHERE id=?';
    db.query(sql, [name, description, price, stock, category, image, id], callback);
};

exports.deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
};
