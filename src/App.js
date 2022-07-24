import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/products_list" element={<ProductList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
