import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteSupplier = () => {
    const [supplierId, setSupplierId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/suppliers/deleteSupplierById?id=${supplierId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResponseMessage(response.data.message);
            setSupplierId('');
        } catch (error) {
            setResponseMessage('Erro ao deletar o produto');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Deletar Fornecedor por ID</h3>
            <div className="form-group">
                <label className="fw-bold text-center d-block">ID do Fornecedor:</label>
                <input
                    type='text'
                    className='form-control'
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                />
                <button className="btn btn-danger btn-block mt-3" onClick={handleDelete}>Deletar Fornecedor</button>
            </div>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default DeleteSupplier;