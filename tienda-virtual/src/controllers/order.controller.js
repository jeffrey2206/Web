const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

exports.createOrder = (req, res) => {
    const user_id = req.userId;

    Cart.getCart(user_id, (err, cartItems) => {
        if (err) return res.status(500).json({ error: err.message });
        if (cartItems.length === 0) return res.status(400).json({ error: 'El carrito está vacío' });

        const total = cartItems.reduce((sum, item) => sum + item.total, 0);

        Order.createOrder(user_id, total, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const order_id = result.insertId;

            cartItems.forEach(item => {
                Order.addOrderItem(order_id, item.id, item.quantity, item.price, (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                });
            });

            Cart.clearCart(user_id, () => {
                res.json({ message: 'Pedido creado exitosamente', order_id });
            });
        });
    });
};

exports.getOrdersByUser = (req, res) => {
    const user_id = req.userId;

    Order.getOrdersByUser(user_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getOrderDetails = (req, res) => {
    const { id } = req.params;

    Order.getOrderDetails(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
        res.json(results);
    });
};

exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    Order.updateOrderStatus(id, status, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Estado del pedido actualizado' });
    });
};

exports.cancelOrder = (req, res) => {
    const { id } = req.params;

    Order.cancelOrder(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(400).json({ error: 'El pedido no puede ser cancelado' });
        res.json({ message: 'Pedido cancelado' });
    });
};
