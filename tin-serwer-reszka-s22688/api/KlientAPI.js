const KlientRepository = require('../repository/sequelize/KlientRepository');
const authUtil = require('../utils/authUtils');

exports.getKlients = (req, res, next) => {
    KlientRepository.getKlients()
    .then(klients => {
        res.status(200).json(klients);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getKlientById = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
    .then(klient => {
        if(!klient) {
            res.status(404).json({
                message: 'Klient o id: ' + klientId + ' nie został znaleziony'
            })
        } else {
            // if(req.user.userId != klient._Id)
            //     res.status(404).json({
            //         message: 'Brak uprawnień'
            //     })
            // else    
                res.status(200).json(klient);
        }
    });
};

exports.createKlient = (req, res, next) => {
    req.body.password = authUtil.hashPassword(req.body.password);
    KlientRepository.createKlient(req.body)
    .then(newObj => {
        res.status(201).json(newObj);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(JSON.stringify(err));
    });
};

exports.updateKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    const klientData = {...req.body};

    KlientRepository.getKlientById(klientId)
        .then(klient => {
             if(klientData.password != klient.password) {
                klientData.password = authUtil.hashPassword(klientData.password);
            }
        })
        .then(() => {
            return KlientRepository.updateKlient(klientId, klientData);
        })
    .then(result => {
        res.status(200).json({message: 'Zaktualizowano dane klienta!', emp: result})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.deleteKlient(klientId)
    .then(result => {
        res.status(200).json({message: 'Usunięto klienta', emp: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};