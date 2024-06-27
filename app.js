// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sequelize = require('./config/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi session
const sessionStore = new SequelizeStore({
    db: sequelize
});

app.use(session({
    secret: 'your_session_secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
}));

// Sync Sequelize dengan database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
}).catch(err => console.error('Error syncing database:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pegawai', require('./routes/pegawaiRoutes'));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
