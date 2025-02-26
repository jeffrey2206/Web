const db = require('../config/database');

exports.getTotalSales = (callback) => {
    const sql = 'SELECT SUM(total) AS total_sales FROM orders WHERE status = "Entregado"';
    db.query(sql, callback);
};

exports.getTopProducts = (callback) => {
    const sql = `
        SELECT p.name, SUM(oi.quantity) AS total_sold
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY p.id
        ORDER BY total_sold DESC
        LIMIT 5;
    `;
    db.query(sql, callback);
};

exports.getTotalUsers = (callback) => {
    const sql = 'SELECT COUNT(*) AS total_users FROM users';
    db.query(sql, callback);
};

exports.getOrdersByStatus = (callback) => {
    const sql = `
        SELECT status, COUNT(*) AS total
        FROM orders
        GROUP BY status;
    `;
    db.query(sql, callback);
};
