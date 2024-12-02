// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../auth');

// Importar o modelo e criar os serviços e controllers
const db = require('../models');
const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

// Instanciar o serviço e o controller
const paymentService = new PaymentService(db.Transaction);
const paymentController = new PaymentController(paymentService);

// Rota para pagamento com cartão de crédito
router.post('/credit-card', auth.verifyToken, (req, res) => {
    paymentController.processCreditCardPayment(req, res);
});

// Rota para pagamento com PIX
router.post('/pix', auth.verifyToken, (req, res) => {
    paymentController.processPixPayment(req, res);
});

// Rota para consultar o status da transação
router.get('/status', auth.verifyToken, (req, res) => {
    paymentController.getTransactionStatus(req, res);
});

module.exports = router;
