const Cart = require('../models/cart.model');

exports.addToCart = (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.userId;

    if (!product_id || !quantity) {
        return res.status(400).json({ error: 'Producto y cantidad son obligatorios' });
    }

    Cart.addToCart(user_id, product_id, quantity, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto agregado al carrito' });
    });
};

exports.getCart = (req, res) => {
    const user_id = req.userId;

    Cart.getCart(user_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.updateCart = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
        return res.status(400).json({ error: 'La cantidad es obligatoria' });
    }

    Cart.updateCart(id, quantity, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Carrito actualizado' });
    });
};

exports.removeFromCart = (req, res) => {
    const { id } = req.params;

    Cart.removeFromCart(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto eliminado del carrito' });
    });
};

exports.clearCart = (req, res) => {
    const user_id = req.userId;

    Cart.clearCart(user_id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Carrito vaciado' });
    });
};
