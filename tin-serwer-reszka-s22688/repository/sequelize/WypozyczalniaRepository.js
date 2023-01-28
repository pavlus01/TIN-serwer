const Auto = require("../../model/sequelize/Auto");
const Wypozyczalnia = require("../../model/sequelize/Wypozyczalnia");

exports.getWypozyczalnias = () => {
    return Wypozyczalnia.findAll();
};

exports.getWypozyczalniaById = (wypozyczalnia_Id) => {
    return Wypozyczalnia.findByPk(wypozyczalnia_Id, {
        include: [{
            model: Auto,
            as: 'pojazdy',
        }]
    });
};

exports.createWypozyczalnia = (newWypoData) => {
    return Wypozyczalnia.create({
        ulica: newWypoData.ulica,
        numer: newWypoData.numer,
        kod: newWypoData.kod,
        miasto: newWypoData.miasto,
    });
};

exports.updateWypozyczalnia = (wypozyczalnia_Id, WypoData) => {
    return Wypozyczalnia.update(WypoData, {where: {_id: wypozyczalnia_Id}});
};

exports.deleteWypozyczalnia = (wypozyczalnia_Id) => {
    return Wypozyczalnia.destroy({
        where: {_id: wypozyczalnia_Id}
    });
};