const Sequelize = require ('sequelize');
const sequalize = require('../../config/sequelize/sequelize');

const Portfel = sequalize.define('Portfel', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nr_karty: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [16, 17],
                msg: "Pole powinno zawierać 16 znaków"
            },
        }
    },
    saldo_konta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole powinno być liczbą całkowitą"
            },
        }
    },
    klient_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
   
});

module.exports = Portfel;