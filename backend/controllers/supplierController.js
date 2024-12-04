class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }

    async create(req, res) {
        try {
            const { nome, contato, email } = req.body;
            const newSupplier = await this.supplierService.createSupplier(nome, contato, email);
            res.status(201).json(newSupplier);
        } catch (error) {
            res.status(500).json({  error: 'Erro ao criar o fornecedor.' });
        }
    }

    async getAll(req, res) {
        try {
            const suppliers = await this.supplierService.getAllSuppliers();
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os fornecedores.' });
        }
    }

    async update(req, res) {
        const { id, nome, contato, email } = req.body;

        try {
            const updatedSupplier = await this.supplierService.updateSupplier(id, {
                nome,
                contato,
                email,
            });

            if (!updatedSupplier) {
                return res.status(404).json({ error: 'Fornecedor não encontrado.' });
            }

            res.status(200).json(updatedSupplier);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar fornecedor.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query;
            const deletedSupplier = await this.supplierService.delete(id);
            if (deletedSupplier) {
                res.status(200).json({ message: 'Fornecedor deletado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Fornecedor não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o fornecedor.' });
        }
    }
}

module.exports = SupplierController;