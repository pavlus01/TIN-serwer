const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');

router.get('/', autoController.showAutoList);
router.get('/add', autoController.showAddAutoForm);
router.get('/details/:autoId', autoController.showDetailsAuto);
router.get('/edit/:autoId', autoController.showEditAutoForm);
router.get('/invalid', autoController.showAutoFormInvalid);
router.get('/empty', autoController.showAutoEmptyList);
router.post('/add', autoController.addAuto);
router.post('/edit', autoController.updateAuto);
router.get('/delete/:autoId', autoController.deleteAuto);

module.exports = router;