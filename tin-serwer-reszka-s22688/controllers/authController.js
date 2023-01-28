const KlientRepository = require('../repository/sequelize/KlientRepository');
const authUtil = require('../utils/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    KlientRepository.findByEmail(email)
        .then(klient => {
            if(!klient) {
                res.render('pages/logowanie', {
                    navLocation: 'logowanie',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, klient.password) == true) {
                req.session.loggedUser = klient;
                res.redirect('/');
            } else {
                res.render('pages/logowanie', {
                    navLocation: 'logowanie',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

exports.showLogowanieForm = (req, res, next) => {
    res.render('pages/logowanie', {
        navLocation: 'Logowanie',
        validationErrors: []
    });
}