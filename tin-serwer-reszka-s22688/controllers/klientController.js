const KlientRepository = require('../repository/sequelize/KlientRepository');
const authUtil = require('../utils/authUtils');

exports.showKlientList = (req, res, next) => {
    KlientRepository.getKlients()
    .then(klients => {
        res.render('pages/Klient/list', {
            klients: klients,
            navLocation: 'klient'
        });
    });
    //res.render('pages/Klient/list', {navLocation: 'klient'});
}

exports.showKlientForm = (req, res, next) => {
    res.render('pages/Klient/form', {navLocation: 'klient'});
}

exports.showKlientDetails = (req, res, next) => {
    res.render('pages/Klient/details', {navLocation: 'klient'});
}

exports.showKlientFormEdit = (req, res, next) => {
    res.render('pages/Klient/form-edit', {navLocation: 'klient'});
}

exports.showKlientFormInvalid = (req, res, next) => {
    res.render('pages/Klient/form-invalid', {navLocation: 'klient'});
}

exports.showKlientEmptyList = (req, res, next) => {
    res.render('pages/Klient/list-empty', {navLocation: 'klient'});
}

exports.showAddKlientForm = (req, res, next) => {
    res.render('pages/Klient/form', {
        klient: {},
        pageTitle: req.__('Klient.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('Klient.form.add.btnLabel'),
        formAction: '/Klient/add',
        navLocation: 'klient',
        validationErrors: []
    });
}

exports.showEditKlientForm = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            res.render('pages/Klient/form', {
                klient: klient,
                pageTitle: req.__('Klient.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('Klient.form.edit.btnLabel'),
                formAction: '/Klient/edit',
                navLocation: 'klient',
                validationErrors: []
        })
    });
}

exports.showDetailsKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            res.render('pages/Klient/form', {
                klient: klient,
                pageTitle: req.__('Klient.form.details'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'klient',
                validationErrors: []
        })
    });
}

exports.addKlient = (req, res, next) => {
    const klientData = {...req.body};
    const oldPass = klientData.password;
    klientData.password = authUtil.hashPassword(klientData.password);
    KlientRepository.createKlient(klientData)
    .then( result => {
        res.redirect('/Klient');
    })
    .catch(err => {
        err.errors.forEach(element => {
            if (element.path.includes('email') && element.type == 'unique violation') {
              element.message = "Podany email jest już używany";
            }  
          });
          klientData.password = oldPass;
        res.render('pages/Klient/form', {
            klient: klientData,
            pageTitle: req.__('Klient.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('Klient.form.add.btnLabel'),
            formAction: '/Klient/add',
            navLocation: 'klient',
            validationErrors: err.errors
        });
    });
};

exports.updateKlient = (req, res, next) => {
    const klientId = req.body._id;
    const klientData = {...req.body};
    const oldPass = klientData.password;

    KlientRepository.findByEmail(klientData.email)
        .then(klient => {
             if(klientData.password != klient.password) {
                klientData.password = authUtil.hashPassword(klientData.password);
            }
        })
        .then(() => {
            return KlientRepository.updateKlient(klientId, klientData);
        })
        .then( result => {
            res.redirect('/Klient');
        })
        .catch(err => {
            err.errors.forEach(element => {
                if (element.path.includes('email') && element.type == 'unique violation') {
                element.message = "Podany email jest już używany";
                }  
            });
        klientData.password = oldPass;
        res.render('pages/Klient/form', {
            klient: klientData,
            pageTitle: req.__('Klient.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('Klient.form.edit.btnLabel'),
            formAction: '/Klient/edit',
            navLocation: 'klient',
            validationErrors: err.errors
        });
    });
};

exports.deleteKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.deleteKlient(klientId)
    .then( () => {
        res.redirect('/Klient');
    });
};