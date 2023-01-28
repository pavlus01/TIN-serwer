const express  = require('express');
const router = express.Router();

const portfelApiController = require('../../api/PortfelAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', portfelApiController.getPortfels);
router.get('/:portfelId', isAuth, portfelApiController.getPortfelById);
router.post('/', isAuth, portfelApiController.createPortfel);
router.put('/:portfelId', isAuth, portfelApiController.updatePortfel);
router.delete('/:portfelId', isAuth, portfelApiController.deletePortfel);

module.exports = router;