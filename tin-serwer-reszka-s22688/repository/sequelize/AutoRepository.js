const Auto = require("../../model/sequelize/Auto");
const Klient = require("../../model/sequelize/Klient");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");
const Wypozyczalnia = require("../../model/sequelize/Wypozyczalnia");

exports.getAutos = () => {
    return Auto.findAll();
};

exports.getAutoById = (auto_Id) => {
    return Auto.findByPk(auto_Id, {
        include: [{
            model: Wypozyczenie,
            as: 'wypozyczenia',
            include: [{
                model: Klient,
                as: 'klient'
            }]
        },
        {
            model: Wypozyczalnia,
            as: 'wypozyczalnia'
        }]
    });
};

exports.createAuto = (newAutoData) => {
    console.log(newAutoData)
    return Auto.create({
        producent: newAutoData.producent,
        model: newAutoData.model,
        rok_produkcji: newAutoData.rok_produkcji,
        kolor: newAutoData.kolor,
        moc_silnika: newAutoData.moc_silnika,
        wypozyczalnia_Id: newAutoData.wypozyczalnia
    });
};

exports.updateAuto = (auto_Id, autoData) => {
    const producent = autoData.producent;
    const model = autoData.model;
    const rok_produkcji = autoData.rok_produkcji;
    const kolor = autoData.kolor;
    const moc_silnika = autoData.moc_silnika;
    autoData.wypozyczalnia_Id = autoData.wypozyczalnia

    return Auto.update(autoData, {where: {_id: auto_Id}});
};

exports.deleteAuto = (auto_Id) => {
    return Auto.destroy({
        where: {_id: auto_Id}
    });
};