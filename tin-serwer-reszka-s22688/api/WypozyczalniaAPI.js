const WypozyczalniaRepository = require('../repository/sequelize/WypozyczalniaRepository');

exports.getWypozyczalnias = (req, res, next) => {
    WypozyczalniaRepository.getWypozyczalnias()
    .then(wypozyczalnias => {
        res.status(200).json(wypozyczalnias);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getWypozyczalniaById = (req, res, next) => {
    const wypozyczalniaId = req.params.wypozyczalniaId;
    WypozyczalniaRepository.getWypozyczalniaById(wypozyczalniaId)
    .then(wypozyczalnia => {
        if(!wypozyczalnia) {
            res.status(404).json({
                message: 'Wypozyczalnia o id: ' + wypozyczalniaId + ' nie została znaleziona'
            })
        } else {
            res.status(200).json(wypozyczalnia);
        }
    });
};

exports.createWypozyczalnia = (req, res, next) => {
    WypozyczalniaRepository.createWypozyczalnia(req.body)
    .then(newObj => {
        res.status(201).json(newObj);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateWypozyczalnia = (req, res, next) => {
    const wypozyczalniaId = req.params.wypozyczalniaId;
    WypozyczalniaRepository.updateWypozyczalnia(wypozyczalniaId, req.body)
    .then(result => {
        res.status(200).json({message: 'Zaktualizowano dane wypozyczalni!', emp: result})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteWypozyczalnia = (req, res, next) => {
    const wypozyczalniaId = req.params.wypozyczalniaId;
    WypozyczalniaRepository.deleteWypozyczalnia(wypozyczalniaId)
    .then(result => {
        res.status(200).json({message: 'Usunięto wypozyczalnie', emp: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};