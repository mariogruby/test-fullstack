import React from 'react';
import logo from './logo.svg';
import CollectionPage from './pages/collectionsPage/collections';
import './App.css';
import ProductPage from './pages/productPage/product-page';
import SignupPage from './pages/signupPage/signup';
import LoginPage from './pages/loginPage/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/signup'element={<SignupPage/>}/>
      <Route path='/login'element={<LoginPage/>}/>
      <Route path='/'element={<CollectionPage/>}/>
      <Route path='/products/:id'element={<ProductPage/>}/>
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