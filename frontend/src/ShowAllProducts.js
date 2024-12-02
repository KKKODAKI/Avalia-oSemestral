import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowAllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/allproducts');
                setProducts(response.data);
            } catch (err) {
                console.error('Erro ao buscar todos os produtos', err);
                setProducts([]); // Limpa os produtos em caso de erro
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Todos os Produtos</h3>
                <ul className="list-group mx-5">
                    {products.map(product => (
                        <li key={product.id} className="list-group-item text-center my-1 border border-dark rounded">
                            <strong>ID:</strong> {product.id}<br/>
                            <strong>Nome:</strong> {product.nome}<br/>
                            <strong>Descrição:</strong> {product.descricao}<br/>
                            <strong>Preço:</strong> R$ {product.preco}<br/>
                            <strong>Estoque:</strong> {product.estoque}
                        </li>
                    ))}
                </ul>          
        </div>
    );
};

export default ShowAllProducts;