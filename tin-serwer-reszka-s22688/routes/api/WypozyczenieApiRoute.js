const express  = require('express');
const router = express.Router();

const wypozyczenieApiController = require('../../api/WypozyczenieAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', wypozyczenieApiController.getWypozyczenies);
router.get('/:wypozyczenieId', isAuth, wypozyczenieApiController.getWypozyczenieById);
router.post('/',  isAuth, wypozyczenieApiController.createWypozyczenie);
router.put('/:wypozyczenieId', isAuth, wypozyczenieApiController.updateWypozyczenie);
router.delete('/:wypozyczenieId', isAuth, wypozyczenieApiController.deleteWypozyczenie);

module.exports = router;