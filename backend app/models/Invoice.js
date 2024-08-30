// backend/models/Invoice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Invoice = sequelize.define('Invoice', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    paymentRequest: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Invoice;
