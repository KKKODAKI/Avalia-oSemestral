import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowAllSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/suppliers/showAllSuppliers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuppliers(response.data);
            } catch (err) {
                console.error('Erro ao buscar todos os fornecedor', err);
                setSuppliers([]);
            }
        };

        fetchSuppliers();
    }, [token]);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Todos os Fornecedores</h3>
                <ul className="list-group mx-5">
                    {suppliers.map(supplier => (
                        <li key={supplier.id} className="list-group-item text-center my-1 border border-dark rounded">
                            <strong>ID:</strong> {supplier.id}<br/>
                            <strong>Nome:</strong> {supplier.nome}<br/>
                            <strong>Contato:</strong> {supplier.contato}<br/>
                            <strong>Email:</strong> {supplier.email}
                        </li>
                    ))}
                </ul>          
        </div>
    );
};

export default ShowAllSuppliers;