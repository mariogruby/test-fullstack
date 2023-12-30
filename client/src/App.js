import React from 'react';
import logo from './logo.svg';
import CollectionPage from './pages/collections';
import './App.css';
import ProductPage from './pages/product-page';

function App() {
  return (
    <div className="App">
      <CollectionPage/>
      <ProductPage/>
    </div>
  );
}

export default App;
