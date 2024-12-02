import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/products/deleteProduct?id=${productId}`);
            setResponseMessage(response.data.message);
            setProductId('');
        } catch (error) {
            setResponseMessage('Erro ao deletar o produto');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Deletar Produto por ID</h3>
            <div className="form-group">
                <label className="fw-bold text-center d-block">ID do Produto:</label>
                <input
                    type='text'
                    className='form-control'
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
                <button className="btn btn-danger btn-block mt-3" onClick={handleDelete}>Deletar Produto</button>
            </div>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default DeleteProduct;