import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierDataForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        contato: '',
        email: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const token = localStorage.getItem('token');

    // Tratar o evento change dos campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Tratar o salvar dados
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/suppliers/createSupplier', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResponseMessage(response.data.message);
            handleClear();
        } catch (error) {
            setResponseMessage('Erro ao salvar o fornecedor');
        }
    };

    const handleClear = () => {
        setFormData({
            nome: '',
            contato: '',
            email: ''
        });
        setResponseMessage('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-sm">
                <h3>Cadastro de Produtos</h3>
                <form className="form-group" onSubmit={handleSave}>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">Fornecedor:</label>
                        <input
                            type='text'
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">Contato:</label>
                        <input
                            type='text'
                            name='contato'
                            value={formData.contato}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">email:</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-block mt-3 mx-1" onClick={handleSave}>Salvar</button>
                    <button type="submit" className="btn btn-secondary btn-block mt-3 mx-1" onClick={handleClear}>Limpar</button>
                </form>
                {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            </div>
        </div>    
    );
};

export default SupplierDataForm;