const express  = require('express');
const router = express.Router();

const wypozyczalniaApiController = require('../../api/WypozyczalniaAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', wypozyczalniaApiController.getWypozyczalnias);
router.get('/:wypozyczalniaId', isAuth, wypozyczalniaApiController.getWypozyczalniaById);
router.post('/', isAuth, wypozyczalniaApiController.createWypozyczalnia);
router.put('/:wypozyczalniaId', isAuth, wypozyczalniaApiController.updateWypozyczalnia);
router.delete('/:wypozyczalniaId', isAuth, wypozyczalniaApiController.deleteWypozyczalnia);

module.exports = router;