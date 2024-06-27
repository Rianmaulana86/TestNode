const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('testci4', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Model Pegawais
const Pegawai = sequelize.define('Pegawai', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2]] // 1 = laki, 2 = perempuan
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'Pegawais', // Pastikan nama tabel sesuai dengan yang Anda gunakan
  timestamps: true, // Aktifkan timestamps Sequelize
  createdAt: 'created_at', // Gunakan nama kolom custom untuk createdAt
  updatedAt: 'updated_at', // Gunakan nama kolom custom untuk updatedAt
  hooks: {
    beforeUpdate: (pegawai, options) => {
      pegawai.updated_at = new Date();
    }
  }
});

// Sinkronkan model dengan basis data
Pegawai.sync()
  .then(() => console.log('Pegawai model synced successfully'))
  .catch(err => console.error('Error syncing Pegawai model:', err));

module.exports = Pegawai;
