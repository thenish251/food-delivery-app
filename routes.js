// src/routes.js

const express = require('express');
const pricingController = require('./controllers/pricingController');

const router = express.Router();

// Define routes
router.post('/calculatePrice', pricingController.calculatePrice);

module.exports = router;
