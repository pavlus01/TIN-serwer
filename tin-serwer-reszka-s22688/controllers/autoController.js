const AutoRepository = require('../repository/sequelize/AutoRepository');

exports.showAutoList = (req, res, next) => {
    AutoRepository.getAutos()
    .then(autos => {
        res.render('pages/Auto/list', {
            autos: autos,
            navLocation: 'auto'
        });
    });
    //res.render('pages/Auto/list', {navLocation: 'auto'});
}

exports.showAutoForm = (req, res, next) => {
    res.render('pages/Auto/form', {navLocation: 'auto'});
}

exports.showAutoDetails = (req, res, next) => {
    res.render('pages/Auto/details', {navLocation: 'auto'});
}

exports.showAutoFormEdit = (req, res, next) => {
    res.render('pages/Auto/form-edit', {navLocation: 'auto'});
}

exports.showAutoFormInvalid = (req, res, next) => {
    res.render('pages/Auto/form-invalid', {navLocation: 'auto'});
}

exports.showAutoEmptyList = (req, res, next) => {
    res.render('pages/Auto/list-empty', {navLocation: 'auto'});
}

exports.showAddAutoForm = (req, res, next) => {
    res.render('pages/Auto/form', {
        auto: {},
        pageTitle: req.__('Auto.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('Auto.form.add.btnLabel'),
        formAction: '/Auto/add',
        navLocation: 'auto',
        validationErrors: []
    });
}

exports.showEditAutoForm = (req, res, next) => {
    const autoId = req.params.autoId;
    AutoRepository.getAutoById(autoId)
        .then(auto => {
            res.render('pages/Auto/form', {
                auto: auto,
                pageTitle: req.__('Auto.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('Auto.form.edit.btnLabel'),
                formAction: '/Auto/edit',
                navLocation: 'auto',
                validationErrors: []
        })
    });
}

exports.showDetailsAuto = (req, res, next) => {
    const autoId = req.params.autoId;
    AutoRepository.getAutoById(autoId)
        .then(auto => {
            res.render('pages/Auto/form', {
                auto: auto,
                pageTitle: req.__('Auto.form.details'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'auto',
                validationErrors: []
        })
    });
}

exports.addAuto = (req, res, next) => {
    const autoData = {...req.body};
    AutoRepository.createAuto(autoData)
    .then( result => {
        res.redirect('/Auto');
    })
    .catch(err => {
        res.render('pages/Auto/form', {
            auto: autoData,
            pageTitle: req.__('Auto.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('Auto.form.add.btnLabel'),
            formAction: '/Auto/add',
            navLocation: 'auto',
            validationErrors: err.errors
        });
    });
};

exports.updateAuto = (req, res, next) => {
    const autoId = req.body._id;
    const autoData = {...req.body};
    AutoRepository.updateAuto(autoId, autoData)
    .then( result => {
        res.redirect('/Auto');
    })
    .catch(err => {
        res.render('pages/Auto/form', {
            auto: autoData,
            pageTitle: req.__('Auto.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('Auto.form.edit.btnLabel'),
            formAction: '/Auto/edit',
            navLocation: 'auto',
            validationErrors: err.errors
        });
    });
};

exports.deleteAuto = (req, res, next) => {
    const autoId = req.params.autoId;
    AutoRepository.deleteAuto(autoId)
    .then( () => {
        res.redirect('/Auto');
    });
};