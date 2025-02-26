const db = require('../config/database');

exports.getAllUsers = (callback) => {
    const sql = 'SELECT id, name, email, role FROM users';
    db.query(sql, callback);
};

exports.blockUser = (id, callback) => {
    const sql = 'UPDATE users SET role = "bloqueado" WHERE id = ?';
    db.query(sql, [id], callback);
};

exports.deleteUser = (id, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], callback);
};
