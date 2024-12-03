import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Buscar os produtos disponíveis para adicionar ao carrinho
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/allproducts');
        setProducts(response.data);
      } catch (err) {
        console.error('Erro ao buscar todos os produtos', err);
      }
    };

    // Buscar os itens do carrinho do usuário
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('localhost:8000/cart/userCarts?userId=', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCartItems(response.data);
      } catch (err) {
        console.error('Erro ao buscar os itens do carrinho', err);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:8000/carts/addProduct', { productId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setResponseMessage(response.data.message);
      // Atualizar o carrinho após adicionar o produto
      const fetchCartItems = async () => {
        try {
          const response = await axios.get('localhost:8000/cart/userCarts?userId=', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setCartItems(response.data);
        } catch (err) {
          console.error('Erro ao buscar os itens do carrinho', err);
        }
      };
      fetchCartItems();
    } catch (error) {
        setResponseMessage(`Erro ao adicionar o produto ao carrinho${error}`);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Carrinho de Compras</h3>
      <div className="row">
        <div className="col-md-6">
          <h4>Produtos Disponíveis</h4>
          <ul className="list-group">
            {products.map(product => (
              <li key={product.id} className="list-group-item">
                {product.nome} - R$ {product.preco}
                <button className="btn btn-primary btn-sm float-end" onClick={() => handleAddToCart(product.id)}>
                  Adicionar ao Carrinho
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Itens no Carrinho</h4>
          <ul className="list-group">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item">
                {item.Product.nome} - R$ {item.Product.preco}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
    </div>
  );
};

export default Cart;