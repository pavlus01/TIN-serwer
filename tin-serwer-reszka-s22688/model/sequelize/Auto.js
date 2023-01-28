const Sequelize = require ('sequelize');
const sequalize = require('../../config/sequelize/sequelize');

const Auto = sequalize.define('Auto', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    producent: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 25],
                msg: "Pole powinno zawierać od 3 do 25 znaków"
            },
        }
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            },
        }
    },
    rok_produkcji: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole powinno być liczbą całkowitą"
            },
            max: {
                args: new Date().getFullYear(),
                msg: "Pole powinno być w zakresie od 1800 do aktualnego roku"
            },
            min: {
                args: 1800,
                msg: "Pole powinno być w zakresie od 1800 do aktualnego roku"
            },
        }
    },
    kolor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 25],
                msg: "Pole powinno zawierać od 3 do 25 znaków"
            },
        }
    },
    moc_silnika: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole powinno być liczbą  całkowitą"
            },
            max: {
                args: 999,
                msg: "Pole powinno być w zakresie od 100 do 999"
            },
            min: {
                args: 100,
                msg: "Pole powinno być w zakresie od 100 do 999"
            },
        }
    },
    wypozyczalnia_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
});

module.exports = Auto;