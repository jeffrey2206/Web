const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Solo permitir que un admin cree otro admin
    if (role === 'admin' && req.userRole !== 'admin') {
        return res.status(403).json({ error: 'No tienes permisos para crear administradores' });
    }

    db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
    [name, email, hashedPassword, role || 'cliente'], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario registrado correctamente' });
    });
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err || result.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

        const user = result[0];
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
