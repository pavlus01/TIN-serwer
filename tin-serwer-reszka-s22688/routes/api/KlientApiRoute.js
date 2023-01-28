const express  = require('express');
const router = express.Router();

const klientApiController = require('../../api/KlientAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', klientApiController.getKlients);
router.get('/:klientId',  isAuth,klientApiController.getKlientById);
router.post('/',  isAuth, klientApiController.createKlient);
router.put('/:klientId',  isAuth, klientApiController.updateKlient);
router.delete('/:klientId',  isAuth, klientApiController.deleteKlient);

module.exports = router;