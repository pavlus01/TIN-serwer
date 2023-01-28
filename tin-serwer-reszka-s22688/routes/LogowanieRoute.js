const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.showLogowanieForm);

module.exports = router;