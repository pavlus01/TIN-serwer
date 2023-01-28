const Sequelize = require ('sequelize');
const sequalize = require('../../config/sequelize/sequelize');

const Wypozyczalnia = sequalize.define('Wypozyczalnia', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ulica: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 26],
                msg: "Pole powinno zawierać od 3 do 25 znaków"
            },
        }
    },
    numer: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 5],
                msg: "Pole powinno zawierać od 2 do 4 znaków"
            },
        }
    },
    kod: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [6, 7],
                msg: "Pole powinno zawierać od 6 do 6 znaków"
            },
        }
    },
    miasto: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 26],
                msg: "Pole powinno zawierać od 3 do 25 znaków"
            },
        }
    },
});

module.exports = Wypozyczalnia;