import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NabVarPrincipal from './componentes/navbar/Nabvar'
import Home from './componentes/home/Home'
import Libros from './componentes/libros/Libros'
import LibrosIngles from './componentes/ingles/Ingles'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacto from './componentes/contacto/Contacto'
import Detalle from './componentes/detalle/Detalle'
import ScrollToTop from "./componentes/ScrollToTop";
import Checkout from './componentes/checkout/Checkout'
import Confirmacion from './componentes/confirmacion/Confirmacion'
import Login from './componentes/account/Login'
import Register from './componentes/account/Register'
import ForgotPassword from './componentes/account/ForgotPassword'


function App() {

  return (

    <div>
      <Router>
        <ScrollToTop />
        <NabVarPrincipal />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/libros' Component={Libros} />
          <Route path='/ingles' Component={LibrosIngles} />
          <Route path='/contacto' Component={Contacto} />
          <Route path='/detalle' Component={Detalle} />
          <Route path='/checkout' Component={Checkout}/>
          <Route path='/confirmacion' Component={Confirmacion}/>
          <Route path="/account/login" Component={Login} />
          <Route path="/account/register" Component={Register}/>
          <Route path="/account/forgot-password" Component={ForgotPassword} />

        </Routes>
      </Router>
        
        
    </div>

  )
}


export default App
