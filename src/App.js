import './App.css';
import { NavBar } from './components/layout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Productlist from './pages/Admin/Products/Productlist';
import CreateProduct from './pages/Admin/Products/CreateProduct';
import EditProduct from './pages/Admin/Products/EditProduct';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import React, { useState, useEffect } from 'react';
import RegisterUser from './components/register/RegisterUser';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<RegisterUser />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/RegisterUser' element={<RegisterUser />} />
        <Route path='/LoginAdmin' element={<LoginAdmin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Admin/Products' element={<Productlist />} />
        <Route path='/Admin/Products/Create' element={<CreateProduct />} />
        <Route path='/Admin/Products/Edit/:id' element={<EditProduct />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
