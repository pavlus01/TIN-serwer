const Auto = require("../../model/sequelize/Auto");
const Klient = require("../../model/sequelize/Klient");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");
const Portfel = require("../../model/sequelize/Portfel");
const authUtil = require('../../utils/authUtils');

exports.getKlients = () => {
    return Klient.findAll();
};

exports.getKlientById = (klient_Id) => {
    return Klient.findByPk(klient_Id, {
        include: [{
            model: Wypozyczenie,
            as: 'wypozyczenia',
            include: [{
                model: Auto,
                as: 'auto'
            }]
        },
        {
            model: Portfel,
            as: 'portfele'
        }]
    });
};

exports.createKlient = (newKlientData) => {
    return Klient.create({
        imie: newKlientData.imie,
        nazwisko: newKlientData.nazwisko,
        email: newKlientData.email,
        data_urodzenia: newKlientData.data_urodzenia,
        password: newKlientData.password,
        admin: newKlientData.admin
    });
};

exports.updateKlient = (klient_Id, klientData) => {
    const imie = klientData.imie;
    const nazwisko = klientData.nazwisko;
    const email = klientData.email;
    const data_urodzenia = klientData.data_urodzenia;

    // const old_password = getKlientById(klient_Id).password;
    // if(old_password != klientData.password) {
    //     klientData.password = authUtil.hashPassword(klientData.password);
    // }

    return Klient.update(klientData, {where: {_id: klient_Id}});
};

exports.deleteKlient = (klient_Id) => {
    return Klient.destroy({
        where: {_id: klient_Id}
    });
};

exports.findByEmail = (email) => {
    return Klient.findOne({
        where: {email: email}
    })
}