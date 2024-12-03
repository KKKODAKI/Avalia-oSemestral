import React, { useState, useEffect } from "react";
import UserAccountForm from './UserAccountForm';
import ProductDataForm from './ProductDataForm';
import ShowAllProducts from './ShowAllProducts';
import DeleteProductById from './DeleteProductById';
import UpdateProductByID from './UpdateProductByID';
import UserLogin from './UserLogin';
import Cart from './Cart';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavClick = (page) => {
    setShowMenu(false);
    setShowLogin(false);
    setCurrentPage(page);
  }

  const handleMenuClick = (option) => {
      switch (option) {
        case 'createProducts':
          setCurrentPage('createProducts');
          break;
        case 'showAllProducts':
          setCurrentPage('showAllProducts');
          break;
        case 'deleteProductById':
          setCurrentPage('deleteProductById');
          break;
        case 'updateProductById':
          setCurrentPage('updateProductById');
          break;
        default:
          break;
      }
    setShowMenu(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowMenu(false);
    setShowLogin(false);
    setIsLoggedIn(false);
    setCurrentPage('landing');
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient">
        <a className="navbar-brand ms-2 text-dark" href="landing">Landing Page</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn me-2" onClick={handleLogout}>Sair</button>
            </li>
            <li className='nav-item'>
              {/*<button className='nav-link btn' onClick={() => setShowMenu(isLoggedIn ? !showMenu : showMenu) && setShowLogin(!isLoggedIn ? !showLogin : showLogin)}>Produtos</button>*/}
              <button className='nav-link btn' onClick={() => isLoggedIn ? setShowMenu(!showMenu) : setShowLogin(!showLogin)}>Produtos</button>
            </li>
            <li>
              <button className='nav-link btn' onClick={() => isLoggedIn ? handleNavClick('cart') : setShowLogin(!showLogin)}>Carrinho</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Menu Flutuante */}
      {showMenu && (
        <div className="dropdown-menu show" style={{ position: 'absolute', right: '5px', top: '60px' }}>
          <button className="dropdown-item" onClick={() => handleMenuClick('createProducts')}>Novo produto</button>
          <button className="dropdown-item" onClick={() => handleMenuClick('showAllProducts')}>Mostrar todos os produtos</button>
          <button className="dropdown-item" onClick={() => handleMenuClick('deleteProductById')}>Deletar produto</button>
          <button className="dropdown-item" onClick={() => handleMenuClick('updateProductById')}>Atualizar produto</button>
        </div>
      )}

      {/* Menu Flutuante */}
      {showLogin && (
        <div className="dropdown-menu show bg-light" style={{ position: 'absolute', right: '5px', top: '60px' }}>
          <p className=" mx-3 my-1 text-danger" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            Login não efetuado
          </p>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div className="mt-4">
            <h1 className="display-4">Segundo Bimestre</h1>
          </div>
        )}

        {/* Criar conta */}
        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <div>
              <UserAccountForm />
            </div>
          </div>
        )}

        {/* Login */}
        {currentPage === 'login' && (
          <div className="mt-4">
            <div>
              <UserLogin />
            </div>
          </div>
        )}

        {/* Sair */}
        {currentPage === 'logout'}

        {/* Criar Produtos */}
        {currentPage === 'createProducts' && isLoggedIn && (
          <div className="mt-4">
            <div>
              <ProductDataForm />
            </div>
          </div>
        )}

        {/* Mostrar todos os produtos */}
        {currentPage === 'showAllProducts' && (
          <div className="mt-4">
            <div>
              <ShowAllProducts />
            </div>
          </div>
        )}

        {/* Deletar produto por id */}
        {currentPage === 'deleteProductById' && isLoggedIn && (
          <div className="mt-4">
            <div>
              <DeleteProductById />
            </div>
          </div>
        )}

        {/* Atualizar produto por id */}
        {currentPage === 'updateProductById' && isLoggedIn && (
          <div className="mt-4">
            <div>
              <UpdateProductByID />
            </div>
          </div>
        )}

        {/* Carrinho */}
        {currentPage === 'cart' && (
          <div className="mt-4">
            <div>
              <Cart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;