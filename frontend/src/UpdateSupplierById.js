import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateSupplierById = () => {
    const [supplierId, setSupplierId] = useState('');
    const [supplierData, setSupplierData] = useState({
        nome: '',
        contato: '',
        email: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData({
            ...supplierData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/suppliers/updateSupplierById`, {
                id: supplierId,
                nome: supplierData.nome,
                contato: supplierData.contato,
                email: supplierData.email
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResponseMessage(response.data.message);
            setSupplierId('');
            setSupplierData({
                nome: '',
                contato: '',
                email: ''
            });
        } catch (error) {
            setResponseMessage('Erro ao atualizar o produto');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Atualizar Fornecedor por ID</h3>
            <div className="form-group">
                <label className="fw-bold text-center d-block">ID do Fornecedor:</label>
                <input
                    type='text'
                    className='form-control'
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Nome:</label>
                <input
                    type='text'
                    name='nome'
                    className='form-control'
                    value={supplierData.nome}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Contato:</label>
                <input
                    type='text'
                    name='contato'
                    className='form-control'
                    value={supplierData.contato}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Email:</label>
                <input
                    type='email'
                    name='email'
                    className='form-control'
                    value={supplierData.email}
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary btn-block mt-3" onClick={handleUpdate}>Atualizar Fornecedor</button>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default UpdateSupplierById;