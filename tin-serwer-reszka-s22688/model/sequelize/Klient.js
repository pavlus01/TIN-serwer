const Sequelize = require ('sequelize');
const sequalize = require('../../config/sequelize/sequelize');

getToday = () => {
    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
        
    return [year, month, day].join('-');
}

const Klient = sequalize.define('Klient', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imie: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [3, 25],
                msg: "len_3_25"
            },
        }
    },
    nazwisko: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2, 45],
                msg: "len_2_45"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5, 60],
                msg: "len_5_60"
            },
            isEmail: {
                msg: "isEmail"
            }
        }
    },
    admin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
        }
    },
    data_urodzenia: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "isYear"
            },
            isBefore(value) {
                const valueDate = new Date(value);
                const compareToDate = new Date(getToday());

                if (compareToDate.getFullYear() - valueDate.getFullYear() < 0) {
                    throw new Error('isFutureDate');
                } else if (compareToDate.getFullYear() - valueDate.getFullYear() == 0) {
                        if (compareToDate.getMonth() - valueDate.getMonth() < 0) {
                            throw new Error('isFutureDate');
                        } else if (compareToDate.getMonth() - valueDate.getMonth() == 0) {
                                if (compareToDate.getDate() - valueDate.getDate() < 0) {
                                    throw new Error('isFutureDate');
                                }
                    }
                }
            },
            isAdult(value) {
                const valueDate = new Date(value);
                const compareToDate = new Date(getToday());

                if (compareToDate.getFullYear() - valueDate.getFullYear() < 18) {
                    throw new Error('is18');
                } else if (compareToDate.getFullYear() - valueDate.getFullYear() == 18) {
                        if (compareToDate.getMonth() - valueDate.getMonth() < 0) {
                            throw new Error('is18');
                        } else if (compareToDate.getMonth() - valueDate.getMonth() == 0) {
                                if (compareToDate.getDate() - valueDate.getDate() < 0) {
                                    throw new Error('is18');
                                }
                    }
                }
            }
        }
    }
});

module.exports = Klient;