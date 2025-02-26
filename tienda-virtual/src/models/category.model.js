const db = require('../config/database');

exports.createCategory = (name, callback) => {
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    db.query(sql, [name], callback);
};

exports.getCategories = (callback) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, callback);
};

exports.updateCategory = (id, name, callback) => {
    const sql = 'UPDATE categories SET name = ? WHERE id = ?';
    db.query(sql, [name, id], callback);
};

exports.deleteCategory = (id, callback) => {
    const sql = 'DELETE FROM categories WHERE id = ?';
    db.query(sql, [id], callback);
};
