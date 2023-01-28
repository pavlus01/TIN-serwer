const Portfel = require("../../model/sequelize/Portfel");
const Klient = require("../../model/sequelize/Klient");

exports.getPortfels = () => {
    return Portfel.findAll();
};

exports.getPortfelById = (portfel_Id) => {
    return Portfel.findByPk(portfel_Id, {
        include: [{
            model: Klient,
            as: 'klient',
        }]
    });
};

exports.createPortfel = (newPortfelData) => {
    return Portfel.create({
        nr_karty: newPortfelData.nr_karty,
        saldo_konta: newPortfelData.saldo_konta,
        klient_Id: newPortfelData.klient_Id,
    });
};

exports.updatePortfel = (portfel_Id, portfelData) => {
    return Portfel.update(portfelData, {where: {_id: portfel_Id}});
};

exports.deletePortfel = (portfel_Id) => {
    return Portfel.destroy({
        where: {_id: portfel_Id}
    });
};