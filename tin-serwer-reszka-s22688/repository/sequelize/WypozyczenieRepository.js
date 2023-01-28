const Auto = require("../../model/sequelize/Auto");
const Klient = require("../../model/sequelize/Klient");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");

exports.getWypozyczenies = () => {
    return Wypozyczenie.findAll({include: [
        {
            model: Auto,
            as: 'auto'
        },
        {
            model: Klient,
            as: 'klient'
        }]
    });
};

exports.getWypozyczenieById = (wypozyczenie_Id) => {
    return Wypozyczenie.findByPk(wypozyczenie_Id, {include: [
        {
            model: Auto,
            as: 'auto'
        },
        {
            model: Klient,
            as: 'klient'
        }]
    });
};

exports.createWypozyczenie = (data) => {
    console.log(JSON.stringify(data));

    return Wypozyczenie.create({
        data_wypozyczenia: data.data_wypozyczenia,
        data_zwrotu: data.data_zwrotu ? data.data_zwrotu : null,
        auto_Id: data.auto,
        klient_Id: data.klient
    });
};

exports.updateWypozyczenie = (wypozyczenie_Id, data) => {
    return Wypozyczenie.update(data, {where: {_id: wypozyczenie_Id}});
};

exports.deleteWypozyczenie = (wypozyczenie_Id) => {
    return Wypozyczenie.destroy({
        where: {_id: wypozyczenie_Id}
    });
};

exports.deleteManyWypozyczenies = (wypozyczenie_Ids) => {
    return Wypozyczenie.find({ _id: { [Sequelize.Op.in]: wypozyczenie_Ids}});
};