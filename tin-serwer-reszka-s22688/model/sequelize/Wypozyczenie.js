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

const Wypozyczenie = sequalize.define('Wypozyczenie', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_wypozyczenia: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
            isBefore(value) {
                const valueDate = new Date(value);
                const compareToDate = new Date(getToday());

                if (compareToDate.getFullYear() - valueDate.getFullYear() < 0) {
                    throw new Error('Data powinna być z przeszłości');
                } else if (compareToDate.getFullYear() - valueDate.getFullYear() == 0) {
                        if (compareToDate.getMonth() - valueDate.getMonth() < 0) {
                            throw new Error('Data powinna być z przeszłości');
                        } else if (compareToDate.getMonth() - valueDate.getMonth() == 0) {
                                if (compareToDate.getDate() - valueDate.getDate() < 0) {
                                    throw new Error('Data powinna być z przeszłości');
                                }
                    }
                }
            },
        }
    },
    data_zwrotu: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
            isBefore(value) {
                const valueDate = new Date(value);
                const compareToDate = new Date(getToday());

                if (compareToDate.getFullYear() - valueDate.getFullYear() < 0) {
                    throw new Error('Data powinna być z przeszłości');
                } else if (compareToDate.getFullYear() - valueDate.getFullYear() == 0) {
                        if (compareToDate.getMonth() - valueDate.getMonth() < 0) {
                            throw new Error('Data powinna być z przeszłości');
                        } else if (compareToDate.getMonth() - valueDate.getMonth() == 0) {
                                if (compareToDate.getDate() - valueDate.getDate() < 0) {
                                    throw new Error('Data powinna być z przeszłości');
                                }
                    }
                }
            },
            datesValidation(value){
                const valueDate = new Date(value);
                const compareToDate = new Date(this.data_wypozyczenia);

                if (valueDate.getTime() != compareToDate.getTime() && valueDate.getTime() <= compareToDate.getTime() && value != null)
                    throw new Error('Data powinna być po dacie wypożyczenia');
            }
        }
    },
    auto_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
    klient_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
});

module.exports = Wypozyczenie;