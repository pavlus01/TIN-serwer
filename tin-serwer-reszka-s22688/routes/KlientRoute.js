const express = require('express');
const router = express.Router();
const klientController = require('../controllers/klientController');

router.get('/', klientController.showKlientList);
router.get('/add', klientController.showAddKlientForm);
router.get('/details/:klientId', klientController.showDetailsKlient);
router.get('/edit/:klientId', klientController.showEditKlientForm);
router.get('/invalid', klientController.showKlientFormInvalid);
router.get('/empty', klientController.showKlientEmptyList);
router.post('/add', klientController.addKlient);
router.post('/edit', klientController.updateKlient);
router.get('/delete/:klientId', klientController.deleteKlient);

module.exports = router;