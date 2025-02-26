const db = require('../config/database');

exports.createOrder = (user_id, total, callback) => {
    const sql = 'INSERT INTO orders (user_id, total) VALUES (?, ?)';
    db.query(sql, [user_id, total], callback);
};

exports.addOrderItem = (order_id, product_id, quantity, price, callback) => {
    const sql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(sql, [order_id, product_id, quantity, price], callback);
};

exports.getOrdersByUser = (user_id, callback) => {
    const sql = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
    db.query(sql, [user_id], callback);
};

exports.getOrderDetails = (order_id, callback) => {
    const sql = `
        SELECT o.*, oi.product_id, oi.quantity, oi.price
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        WHERE o.id = ?
    `;
    db.query(sql, [order_id], callback);
};

exports.updateOrderStatus = (order_id, status, callback) => {
    const sql = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(sql, [status, order_id], callback);
};

exports.cancelOrder = (order_id, callback) => {
    const sql = 'UPDATE orders SET status = "Cancelado" WHERE id = ? AND status = "Pendiente"';
    db.query(sql, [order_id], callback);
};
