const WypozyczenieRepository = require('../repository/sequelize/WypozyczenieRepository');
const AutoRepository = require('../repository/sequelize/AutoRepository');
const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.showWypozyczenieList = (req, res, next) => {
    WypozyczenieRepository.getWypozyczenies()
    .then(wypozyczenies => {
        res.render('pages/Wpozyczenie/list', {
            wypozyczenies: wypozyczenies,
            navLocation: 'wypozyczenie'
        });
    });
    //res.render('pages/Wpozyczenie/list', {navLocation: 'wypozyczenie'});
}

exports.showWypozyczenieForm = (req, res, next) => {
    res.render('pages/Wpozyczenie/form', {navLocation: 'wypozyczenie'});
}

exports.showWypozyczenieDetails = (req, res, next) => {
    res.render('pages/Wpozyczenie/details', {navLocation: 'wypozyczenie'});
}

exports.showWypozyczenieFormEdit = (req, res, next) => {
    res.render('pages/Wpozyczenie/form-edit', {navLocation: 'wypozyczenie'});
}

exports.showWypozyczenieFormInvalid = (req, res, next) => {
    res.render('pages/Wpozyczenie/form-invalid', {navLocation: 'wypozyczenie'});
}

exports.showWypozyczenieEmptyList = (req, res, next) => {
    res.render('pages/Wpozyczenie/list-empty', {navLocation: 'wypozyczenie'});
}

exports.showAddWypozyczenieForm = (req, res, next) => {
    let allAutos, allKlients;
    AutoRepository.getAutos()
    .then(autos => {
        allAutos = autos;
        return KlientRepository.getKlients();
    })
    .then(klients => {
        allKlients = klients;
        res.render('pages/Wpozyczenie/form', {
            wypozyczenie: {},
            allAutos: allAutos,
            allKlients: allKlients,
            pageTitle: req.__('Wypozyczenie.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('Wypozyczenie.form.add.btnLabel'),
            formAction: '/Wypozyczenie/add',
            navLocation: 'wypozyczenie',
            validationErrors: [],
            sel: false,
        });
    });
}

exports.showEditWypozyczenieForm = (req, res, next) => {
    let allAutos, allKlients;
    const wypozyczenieId = req.params.wypozyczenieId;
    AutoRepository.getAutos()
    .then(autos => {
        allAutos = autos;
        return KlientRepository.getKlients();
    })
    .then(klients => {
        allKlients = klients;
        return  WypozyczenieRepository.getWypozyczenieById(wypozyczenieId)
    })
    .then(wypozyczenie => {
        res.render('pages/Wpozyczenie/form', {
            wypozyczenie: wypozyczenie,
            allAutos: allAutos,
            allKlients: allKlients,
            pageTitle: req.__('Wypozyczenie.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('Wypozyczenie.form.edit.btnLabel'),
            formAction: '/Wypozyczenie/edit',
            navLocation: 'wypozyczenie',
            validationErrors: [],
            sel: true,
        });
    });
}

exports.showDetailsWypozyczenie = (req, res, next) => {
    let allAutos, allKlients;
    const wypozyczenieId = req.params.wypozyczenieId;
    AutoRepository.getAutos()
    .then(autos => {
        allAutos = autos;
        return KlientRepository.getKlients();
    })
    .then(klients => {
        allKlients = klients;
        return  WypozyczenieRepository.getWypozyczenieById(wypozyczenieId)
    })
    .then(wypozyczenie => {
        res.render('pages/Wpozyczenie/form', {
                wypozyczenie: wypozyczenie,
                pageTitle: req.__('Wypozyczenie.form.details'),
                allAutos: allAutos,
                allKlients: allKlients,
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'wypozyczenie',
                validationErrors: [],
                sel: true,
        });
    });
}

exports.addWypozyczenie = (req, res, next) => {
    let allAutos, allKlients;
    const wypozyczenieData = {...req.body};
    AutoRepository.getAutos()
    .then(autos => {
        allAutos = autos;
        return KlientRepository.getKlients();
    })
    .then(klients => {
        allKlients = klients;
        return  WypozyczenieRepository.createWypozyczenie(wypozyczenieData)
    })
    .then( result => {
        res.redirect('/Wypozyczenie');
    })
    .catch(err => {
        wypozyczenieData.auto_Id = wypozyczenieData.auto;
        wypozyczenieData.klient_Id = wypozyczenieData.klient;
        res.render('pages/Wpozyczenie/form', {
            wypozyczenie: wypozyczenieData,
            pageTitle: req.__('Wypozyczenie.form.add.pageTitle'),
            allAutos: allAutos,
            allKlients: allKlients,
            formMode: 'createNew',
            btnLabel: req.__('Wypozyczenie.form.add.btnLabel'),
            formAction: '/Wypozyczenie/add',
            navLocation: 'wypozyczenie',
            validationErrors: err.errors,
            sel: true,
        });
    });
};

exports.updateWypozyczenie = (req, res, next) => {
    let allAutos, allKlients;
    const wypozyczenieId = req.body._id;
    const wypozyczenieData = {...req.body};
    AutoRepository.getAutos()
    .then(autos => {
        allAutos = autos;
        return KlientRepository.getKlients();
    })
    .then(klients => {
        allKlients = klients;
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if(!pattern.test(wypozyczenieData.data_zwrotu)) wypozyczenieData.data_zwrotu = null;
        wypozyczenieData.auto_Id = wypozyczenieData.auto;
        wypozyczenieData.klient_Id = wypozyczenieData.klient;
        return  WypozyczenieRepository.updateWypozyczenie(wypozyczenieId, wypozyczenieData)
    })
    .then( result => {
        res.redirect('/Wypozyczenie');
    })
    .catch(err => {
        res.render('pages/Wpozyczenie/form', {
            wypozyczenie: wypozyczenieData,
            pageTitle: req.__('Wypozyczenie.form.edit.pageTitle'),
            allAutos: allAutos,
            allKlients: allKlients,
            formMode: 'edit',
            btnLabel: req.__('Wypozyczenie.form.edit.btnLabel'),
            formAction: '/Wypozyczenie/edit',
            navLocation: 'wypozyczenie',
            validationErrors: err.errors,
            sel: true,
        });
    });
};

exports.deleteWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.deleteWypozyczenie(wypozyczenieId)
    .then( () => {
        res.redirect('/Wypozyczenie');
    });
};