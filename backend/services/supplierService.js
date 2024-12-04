class SupplierService {
    constructor(SupplierModel) {
        this.Supplier = SupplierModel;
    }

    async createSupplier(nome, contato, email) {
        try {
            const newSupplier = await this.Supplier.create({
                nome:nome,
                contato:contato,
                email:email
            });
            return newSupplier;
        } catch (error) {
            throw error;
        }
    }

    async getAllSuppliers() {
        try {
            const suppliers = await this.Supplier.findAll();
            return suppliers;
        } catch (error) {
            throw error;
        }
    }

    async updateSupplier(id, updatedData) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            if (!supplier) {
                throw new Error('Produto não encontrado');
            }

            // Atualizando os dados do produto
            const updatedSupplier = await supplier.update(updatedData);
            return updatedSupplier;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            if (supplier) {
                await supplier.destroy();
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = SupplierService;