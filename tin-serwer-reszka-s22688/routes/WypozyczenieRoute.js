const express = require('express');
const router = express.Router();
const wypozyczenieController = require('../controllers/wypozyczenieController');

router.get('/', wypozyczenieController.showWypozyczenieList);
router.get('/add', wypozyczenieController.showAddWypozyczenieForm);
router.get('/details/:wypozyczenieId', wypozyczenieController.showDetailsWypozyczenie);
router.get('/edit/:wypozyczenieId', wypozyczenieController.showEditWypozyczenieForm);
router.get('/invalid', wypozyczenieController.showWypozyczenieFormInvalid);
router.get('/empty', wypozyczenieController.showWypozyczenieEmptyList);
router.post('/add', wypozyczenieController.addWypozyczenie);
router.post('/edit', wypozyczenieController.updateWypozyczenie);
router.get('/delete/:wypozyczenieId', wypozyczenieController.deleteWypozyczenie);

module.exports = router;