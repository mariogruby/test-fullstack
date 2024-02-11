import React from 'react';
import logo from './logo.svg';
import LandingPage from './pages/landingPage/collections';
import './App.css';
import ProductPage from './pages/productPage/product-page';
import ProductBindingsPage from './pages/bindingPage/binding-page'
import Bindings from './pages/bindingPage/binding';
import Boots from './pages/bootsPage/boots';
import BootPage from './pages/bootsPage/boot-page'
import Helmets from './pages/helmetsPage/helmets';
import HelmetPage from './pages/helmetsPage/helmet-page';
import Goggles from './pages/gogglesPage/goggles';
import GogglePage from './pages/gogglesPage/goggle-page';
import SignupPage from './pages/signupPage/signup';
import LoginPage from './pages/loginPage/login';
import Navbar from './components/Navbar/navbar';
import ApiCollections from './pages/collectionsPage/api-collections';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/snowboards' element={<ApiCollections />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/products/bindings' element={<Bindings />} />
        <Route path='/products/bindings/:productId' element={<ProductBindingsPage />} />
        <Route path='/products/boots' element={<Boots />} />
        <Route path='/products/boots/:productId' element={<BootPage />} />
        <Route path='/products/helmets' element={<Helmets />} />
        <Route path='/products/helmets/:productId' element={<HelmetPage />} />
        <Route path='/products/goggles' element={<Goggles />} />
        <Route path='/products/goggles/:productId' element={<GogglePage />} />
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