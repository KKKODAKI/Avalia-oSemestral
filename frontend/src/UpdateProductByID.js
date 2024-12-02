import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProductByID = () => {
    const [productId, setProductId] = useState('');
    const [productData, setProductData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: ''
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/products/updateProduto`, {
                id: productId,
                nome: productData.nome,
                descricao: productData.descricao,
                preco: productData.preco,
                estoque: productData.estoque
            });
            setResponseMessage(response.data.message);
            setProductId('');
            setProductData({
                nome: '',
                descricao: '',
                preco: '',
                estoque: ''
            });
        } catch (error) {
            setResponseMessage('Erro ao atualizar o produto');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Atualizar Produto por ID</h3>
            <div className="form-group">
                <label className="fw-bold text-center d-block">ID do Produto:</label>
                <input
                    type='text'
                    className='form-control'
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Nome:</label>
                <input
                    type='text'
                    name='nome'
                    className='form-control'
                    value={productData.nome}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Descrição:</label>
                <input
                    type='text'
                    name='descricao'
                    className='form-control'
                    value={productData.descricao}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Preço:</label>
                <input
                    type='text'
                    name='preco'
                    className='form-control'
                    value={productData.preco}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <label className="fw-bold text-center d-block">Estoque:</label>
                <input
                    type='text'
                    name='estoque'
                    className='form-control'
                    value={productData.estoque}
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary btn-block mt-3" onClick={handleUpdate}>Atualizar Produto</button>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default UpdateProductByID;