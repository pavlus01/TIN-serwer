const WypozyczenieRepository = require('../repository/sequelize/WypozyczenieRepository');

exports.getWypozyczenies = (req, res, next) => {
    WypozyczenieRepository.getWypozyczenies()
    .then(wypozyczenies => {
        res.status(200).json(wypozyczenies);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getWypozyczenieById = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.getWypozyczenieById(wypozyczenieId)
    .then(wypozyczenie => {
        if(!wypozyczenie) {
            res.status(404).json({
                message: 'Wypozyczenie o id: ' + wypozyczenieId + ' nie zostało znalezione'
            })
        } else {
            if(req.user.userId != wypozyczenie.klient_Id)
                res.status(404).json({
                    message: 'Brak uprawnień'
                })
            else    
                res.status(200).json(wypozyczenie);
        }
    });
};

exports.createWypozyczenie = (req, res, next) => {
    WypozyczenieRepository.createWypozyczenie(req.body)
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

exports.updateWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.updateWypozyczenie(wypozyczenieId, req.body)
    .then(result => {
        res.status(200).json({message: 'Zaktualizowano dane wypożyczenia!', emp: result})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.deleteWypozyczenie(wypozyczenieId)
    .then(result => {
        res.status(200).json({message: 'Usunięto wypożyczenie', emp: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};