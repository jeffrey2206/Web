require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const cartRoutes = require('./routes/cart.routes');
app.use('/api/cart', cartRoutes);

const orderRoutes = require('./routes/order.routes');
app.use('/api/orders', orderRoutes);

const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/api/dashboard', dashboardRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes);
