const express  = require('express');
const router = express.Router();

const autoApiController = require('../../api/AutoAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', autoApiController.getAutos);
router.get('/:autoId', isAuth, autoApiController.getAutoById);
router.post('/', isAuth, autoApiController.createAuto);
router.put('/:autoId', isAuth, autoApiController.updateAuto);
router.delete('/:autoId', isAuth, autoApiController.deleteAuto);

module.exports = router;