import React from 'react';
import logo from './logo.svg';
import CollectionPage from './pages/collections';
import './App.css';
import ProductPage from './pages/product-page';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/'element={<CollectionPage/>} />
      <Route path='/products/:id'element={<ProductPage/>} />
    </Routes>
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* <Switch> */}
//           <Route exact path="/" component={CollectionPage} />
//           {/* <Route path="/products/:id" render={(props) => <ProductPage {...props} />} /> */}
//         {/* </Switch> */}
//       </div>
//     </Router>
//   );
// }