import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        data_nascimento: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/novouser/', formData); 
            if (response.status === 200) {
                setResponseMessage('Conta criada com sucesso!');
            } else {
                setResponseMessage('Erro ao criar a conta de usuário.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    const [responseMessage, setResponseMessage] = useState('');

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Crie sua conta de usuário</h3>
                <form onSubmit={handleSubmit} className="form-group">
                    <div className="mb-3">
                        <label className="fw-bold text-start d-block">Data Nascimento:</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="data_nasc" 
                            value={formData.data_nasc} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-start d-block">Email:</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-start d-block">Senha:</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block mt-3">Create Account</button>
                </form>
                {responseMessage && <p className="mt-3 text-center">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default UserAccountForm;