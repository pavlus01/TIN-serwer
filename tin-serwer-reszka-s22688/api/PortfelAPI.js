const PortfelRepository = require('../repository/sequelize/PortfelRepository');

exports.getPortfels  = (req, res, next) => {
    PortfelRepository.getPortfels()
    .then(portfels => {
        res.status(200).json(portfels);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getPortfelById = (req, res, next) => {
    const portfelId = req.params.portfelId;
    PortfelRepository.getPortfelById(portfelId)
    .then(portfel => {
        if(!portfel) {
            res.status(404).json({
                message: 'Portfel o id: ' + portfelId + ' nie został znaleziony'
            })
        } else {
            if(req.user.userId != portfel.klient_Id)
                res.status(404).json({
                    message: 'Brak uprawnień'
                })
            else    
                res.status(200).json(portfel);
        }
    });
};

exports.createPortfel = (req, res, next) => {
    PortfelRepository.createPortfel(req.body)
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

exports.updatePortfel = (req, res, next) => {
    const portfelId = req.params.portfelId;
    PortfelRepository.updatePortfel(portfelId, req.body)
    .then(result => {
        res.status(200).json({message: 'Zaktualizowano dane portfela!', emp: result})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deletePortfel = (req, res, next) => {
    const portfelId = req.params.portfelId;
    PortfelRepository.deletePortfel(portfelId)
    .then(result => {
        res.status(200).json({message: 'Usunięto portfel', emp: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};