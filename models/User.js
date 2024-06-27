const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('testci4', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'Users', // Pastikan nama tabel sesuai dengan yang Anda gunakan
  timestamps: true, // Aktifkan timestamps Sequelize
  createdAt: 'created_at', // Gunakan nama kolom custom untuk createdAt
  updatedAt: 'updated_at', // Gunakan nama kolom custom untuk updatedAt
  hooks: {
    beforeUpdate: (user, options) => {
      user.updated_at = new Date();
    }
  }
});

// Sinkronkan model dengan basis data
User.sync()
  .then(() => console.log('User model synced successfully'))
  .catch(err => console.error('Error syncing User model:', err));

module.exports = User;
