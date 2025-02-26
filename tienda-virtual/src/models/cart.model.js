const db = require('../config/database');

exports.addToCart = (user_id, product_id, quantity, callback) => {
    const sql = `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?;
    `;
    db.query(sql, [user_id, product_id, quantity, quantity], callback);
};

exports.getCart = (user_id, callback) => {
    const sql = `
        SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) AS total
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?;
    `;
    db.query(sql, [user_id], callback);
};

exports.updateCart = (id, quantity, callback) => {
    const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';
    db.query(sql, [quantity, id], callback);
};

exports.removeFromCart = (id, callback) => {
    db.query('DELETE FROM cart WHERE id = ?', [id], callback);
};

exports.clearCart = (user_id, callback) => {
    db.query('DELETE FROM cart WHERE user_id = ?', [user_id], callback);
};
