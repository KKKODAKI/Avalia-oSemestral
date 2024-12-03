// ./routes/suppliers.js
const express = require('express');
const router = express.Router();
const auth = require('../auth');

// Implementar as dependencias para o funcionamento da classe supplier
const db = require('../models');

// Instanciar o serviço e o controller
const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

// Contruir os objetos a partir das classes
const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

// Rota para criar um novo fornecedor
router.post('/createSupplier', auth.verifyToken, async (req, res) => {
    supplierController.create(req, res);
});

// Rota para listar todos os fornecedores
router.get('/showAllSuppliers', auth.verifyToken, async (req, res) => {
    supplierController.getAll(req, res);
});

// Rota para atualizar um fornecedor pelo id
router.put('/updateSupplierById', auth.verifyToken, async (req, res) => {
    await supplierController.update(req, res);
});

// Rota para deletar um fornecedor pelo id
router.delete('/deleteSupplierById', auth.verifyToken, async (req, res) => {
    supplierController.delete(req, res);
});

module.exports = router;