const sequelize = require('./sequelize');

const Auto = require('../../model/sequelize/Auto');
const Klient = require('../../model/sequelize/Klient');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');
const Portfel = require('../../model/sequelize/Portfel');
const Wypozyczalnia = require('../../model/sequelize/Wypozyczalnia');

const authUtil = require('../../utils/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Wypozyczalnia.hasMany(Auto, {as: 'pojazdy', foreignKey: {name: 'wypozyczalnia_Id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Auto.belongsTo(Wypozyczalnia, {as: 'wypozyczalnia', foreignKey: {name: 'wypozyczalnia_Id', allowNull: false}});
    Klient.hasMany(Portfel, {as: 'portfele', foreignKey: {name: 'klient_Id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Portfel.belongsTo(Klient, {as: 'klient', foreignKey: {name: 'klient_Id', allowNull: false}});

    Auto.hasMany(Wypozyczenie, {as: 'wypozyczenia', foreignKey: {name: 'auto_Id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Wypozyczenie.belongsTo(Auto, {as: 'auto', foreignKey: {name: 'auto_Id', allowNull: false}});
    Klient.hasMany(Wypozyczenie, {as: 'wypozyczenia', foreignKey: {name: 'klient_Id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Wypozyczenie.belongsTo(Klient, {as: 'klient', foreignKey: {name: 'klient_Id', allowNull: false}});

    let allKlients, allAutos, allWypozyczalnies;

    return sequelize
    .sync({force: true})
    .then( () => {
        return Wypozyczalnia.findAll();
    })
    .then( wypo => {
        if (!wypo || wypo.length == 0) {
            return Wypozyczalnia.bulkCreate([
                {ulica: 'Sobieskiego', numer: '102', kod: '02-931', miasto: 'Legionowo'},
                {ulica: 'Niepodległości', numer: '5', kod: '00-072', miasto: 'Lublin'},
                {ulica: 'Narutowicza', numer: '47b', kod: '12-320', miasto: 'Poznań'}
            ])
            .then( () => {
                return Wypozyczalnia.findAll();
            });
        } else {
            return wypo;
        }
    })
    .then (wypo => {
        allWypozyczalnies = wypo;
        return Auto.findAll();
    })
    .then( auto => {
        if ( !auto || auto.length == 0) {
            return Auto.bulkCreate([
                {producent: 'Skoda', model: 'Superb', rok_produkcji: 2018 ,kolor: 'Czarny', moc_silnika: 150, wypozyczalnia_Id: allWypozyczalnies[0]._id},
                {producent: 'BMW', model: 'i8', rok_produkcji: 2015 ,kolor: 'Czerwony', moc_silnika: 270, wypozyczalnia_Id: allWypozyczalnies[0]._id},
                {producent: 'Aston Martin', model: 'DB11', rok_produkcji: 2021 ,kolor: 'Zielony', moc_silnika: 300, wypozyczalnia_Id: allWypozyczalnies[1]._id}
            ])
            .then( () => {
                return Auto.findAll();
            });
        } else {
            return auto;
        }
    })
    .then( auto => {
        allAutos = auto;
        return Klient.findAll();
    })
    .then( klient => {
        if (!klient || klient.length == 0) {
            return Klient.bulkCreate([
                {imie: 'Jan', nazwisko: 'Kowalski', email: 'jan.kowalski@gmail.com', data_urodzenia: '1978-06-27', password: passHash, admin: 1},
                {imie: 'Łukasz', nazwisko: 'Adamski', email: 'lukasz.adamski@wp.com', data_urodzenia: '1999-02-11', password: passHash, admin: 0},
                {imie: 'Krzysztof', nazwisko: 'Protasiewicz', email: 'k.protasiewicz@wp.com', data_urodzenia: '1969-11-19', password: passHash, admin: 0}
            ])
            .then( () => {
                return Klient.findAll();
            });
        } else {
            return klient;
        }
    })
    .then (klient => {
        allKlients = klient;
        return Portfel.findAll();
    })
    .then( portfel => {
        if (!portfel || portfel.length == 0) {
            return Portfel.bulkCreate([
                {nr_karty: "1234567891234567", saldo_konta: 1000, klient_Id: allKlients[0]._id},
                {nr_karty: "5564378976453289", saldo_konta: 35000, klient_Id: allKlients[1]._id},
                {nr_karty: "2298763546734509", saldo_konta: 2000, klient_Id: allKlients[0]._id},
            ])
            .then( () => {
                return Portfel.findAll();
            });
        } else {
            return portfel;
        }
    })
    .then (() => {
        return Wypozyczenie.findAll();
    })
    .then( wypozyczenie => {
        if (!wypozyczenie || wypozyczenie.length == 0) {
            return Wypozyczenie.bulkCreate([
                {auto_Id: allAutos[2]._id, klient_Id: allKlients[0]._id, data_wypozyczenia: '2022-10-12', data_zwrotu: '2022-11-12'},
                {auto_Id: allAutos[1]._id, klient_Id: allKlients[1]._id, data_wypozyczenia: '2022-09-30', data_zwrotu: '2022-10-07'},
                {auto_Id: allAutos[0]._id, klient_Id: allKlients[2]._id, data_wypozyczenia: '2022-10-09', data_zwrotu: null}
            ]);
        } else {
            return wypozyczenie;
        }
    });
}