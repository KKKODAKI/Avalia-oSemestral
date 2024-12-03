import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId || !token) {
            setResponseMessage('Usuário não autenticado. Faça login novamente.');
            return;
        }

        const fetchCart = async () => {
            try {
                console.log('Fetching cart with userId:', userId, 'and token:', token); // Log para verificar userId e token
                const response = await axios.get(`http://localhost:8000/cart/userCarts?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Cart response:', response.data); // Log para verificar a resposta do servidor
                setCartItems(response.data.items);
            } catch (err) {
                console.error('Erro ao buscar o carrinho', err);
                setCartItems([]); // Limpa os itens do carrinho em caso de erro
                setResponseMessage('Erro ao buscar o carrinho. Verifique sua autenticação.');
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/allproducts');
                setProducts(response.data);
            } catch (err) {
                console.error('Erro ao buscar todos os produtos', err);
                setProducts([]); // Limpa os produtos em caso de erro
                setResponseMessage('Erro ao buscar produtos.');
            }
        };

        fetchCart();
        fetchProducts();
    }, [userId, token]);

    const handleAddProduct = async () => {
        if (!userId || !token) {
            setResponseMessage('Usuário não autenticado. Faça login novamente.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/cart/addProduct', {
                userId,
                productId: selectedProduct,
                quantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResponseMessage(response.data.message);
            // Atualiza o carrinho após a adição
            const updatedCart = await axios.get(`http://localhost:8000/cart/userCarts?userId=${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(updatedCart.data.items);
        } catch (error) {
            setResponseMessage('Erro ao adicionar o produto ao carrinho');
        }
    };

    const handleRemoveProduct = async (productId) => {
        if (!userId || !token) {
            setResponseMessage('Usuário não autenticado. Faça login novamente.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/cart/removeProduct?userId=${userId}&productId=${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResponseMessage(response.data.message);
            // Atualiza o carrinho após a remoção
            const updatedCart = await axios.get(`http://localhost:8000/cart/userCarts?userId=${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(updatedCart.data.items);
        } catch (error) {
            setResponseMessage('Erro ao remover o produto do carrinho');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Seu Carrinho</h3>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            {cartItems.length === 0 ? (
                <p className="text-center">Seu carrinho está vazio.</p>
            ) : (
                <ul className="list-group mx-5">
                    {cartItems.map(item => (
                        <li key={item.productId} className="list-group-item text-center my-1 border border-dark rounded">
                            <strong>Nome:</strong> {item.name}<br/>
                            <strong>Quantidade:</strong> {item.quantity}<br/>
                            <strong>Preço Total:</strong> R$ {item.totalPrice}<br/>
                            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveProduct(item.productId)}>Remover</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4">
                <h4 className="text-center mb-3">Adicionar Produto ao Carrinho</h4>
                <div className="form-group">
                    <label className="fw-bold text-center d-block">Selecione um Produto:</label>
                    <select className="form-control" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                        <option value="">Selecione um produto</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="fw-bold text-center d-block">Quantidade:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                    />
                </div>
                <button className="btn btn-primary btn-block mt-3" onClick={handleAddProduct}>Adicionar ao Carrinho</button>
            </div>
        </div>
    );
};

export default Cart;