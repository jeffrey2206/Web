const User = require('../models/user.model');
const db = require('../config/database');

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

exports.updateUser = (req, res) => {
    const { id } = req.params; // ID del usuario a actualizar
    const { name, email, role } = req.body; // Datos que se pueden actualizar

    // Verificar que al menos un campo esté presente
    if (!name && !email && !role) {
        return res.status(400).json({ error: 'Debes proporcionar al menos un campo para actualizar' });
    }

    // Construir la consulta SQL dinámicamente
    let sql = 'UPDATE users SET ';
    const updates = [];
    const values = [];

    if (name) {
        updates.push('name = ?');
        values.push(name);
    }
    if (email) {
        updates.push('email = ?');
        values.push(email);
    }
    if (role) {
        updates.push('role = ?');
        values.push(role);
    }

    sql += updates.join(', ') + ' WHERE id = ?';
    values.push(id);

    // Ejecutar la consulta
    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    });
};