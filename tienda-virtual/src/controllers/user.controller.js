const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.blockUser = (req, res) => {
    const { id } = req.params;

    User.blockUser(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario bloqueado' });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.deleteUser(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario eliminado' });
    });
};
