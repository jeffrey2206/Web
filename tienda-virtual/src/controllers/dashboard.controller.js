const Dashboard = require('../models/dashboard.model');

exports.getDashboardData = (req, res) => {
    Dashboard.getTotalSales((err, salesResult) => {
        if (err) return res.status(500).json({ error: err.message });

        Dashboard.getTopProducts((err, topProductsResult) => {
            if (err) return res.status(500).json({ error: err.message });

            Dashboard.getTotalUsers((err, usersResult) => {
                if (err) return res.status(500).json({ error: err.message });

                Dashboard.getOrdersByStatus((err, ordersStatusResult) => {
                    if (err) return res.status(500).json({ error: err.message });

                    res.json({
                        total_sales: salesResult[0].total_sales || 0,
                        top_products: topProductsResult,
                        total_users: usersResult[0].total_users,
                        orders_by_status: ordersStatusResult
                    });
                });
            });
        });
    });
};
