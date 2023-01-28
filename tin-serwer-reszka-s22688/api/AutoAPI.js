const AutoRepository = require('../repository/sequelize/AutoRepository');

exports.getAutos = (req, res, next) => {
    AutoRepository.getAutos()
    .then(autos => {
        res.status(200).json(autos);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getAutoById = (req, res, next) => {
    const autoId = req.params.autoId;
    AutoRepository.getAutoById(autoId)
    .then(auto => {
        if(!auto) {
            res.status(404).json({
                message: 'Auto o id: ' + autoId + ' nie zostało znalezione'
            })
        } else {
            res.status(200).json(auto);
        }
    });
};

exports.createAuto = (req, res, next) => {
    AutoRepository.createAuto(req.body)
    .then(newObj => {
        res.status(201).json(newObj);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.json(err.errors)
        next(err);
    });
};

exports.updateAuto = (req, res, next) => {
    const autoId = req.params.autoId;
    AutoRepository.updateAuto(autoId, req.body)
    .then(result => {
        res.status(200).json({message: 'Zaktualizowano dane auta!', emp: result})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteAuto = (req, res, next) => {
    const autoId = req.params.autoId;
    AutoRepository.deleteAuto(autoId)
    .then(result => {
        res.status(200).json({message: 'Usunięto pojazd', emp: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};