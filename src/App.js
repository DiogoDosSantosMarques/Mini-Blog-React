import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import {useState, useEffect} from "react"


import { onAuthStateChanged } from "firebase/auth"; // mapeia se a autenticação foi feita com sucesso

import './App.css';


//Pages
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from "./pages/Login/Login";
import Sobre from "./pages/Sobre/Sobre";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";



import Footer from "./componentes/Footer";
import NavBar from "./componentes/NavBar";

import { useAuthentication } from "./Hooks/useAuthentication";


//Context
import { AuthProvider } from "./contexto/AuthContext";


function App() {

const [user, setUser] = useState(undefined)


const {auth} = useAuthentication()

const loadingUser = user === undefined // se o usuário não foi cadastrado antes vai carregar 

useEffect(() => {

  onAuthStateChanged(auth, (user) => {
    setUser(user)
  })

}, auth) // sempre que mudar a autenticação esse useEffect vai ser executado, porque a cada vez que um usuário da um login ou logout o estado de autenticação é alterado. É AI QUE ENTRA O AUTHPROVIDER



if(loadingUser) {
  return <p>Carregando...</p>
}


  return (
    <div className="App">
      <AuthProvider value={{ user }}> {/* Agora sim eu consigo distribuir esse usuário para todos os lugares*/}
      <BrowserRouter>
    <NavBar />

      <div className="container">
      <Routes>

    <Route path="/"  element={<Home />} />

    <Route path="/search" element={<Search />} />

    

    <Route path="/cadastro"  element={ !user ? <Cadastro /> : <Navigate to="/" />} />
    <Route path="/login"  element={ !user ?  <Login /> : <Navigate to="/" />} />

    <Route path="/sobre"  element={<Sobre />} />

    <Route path="/post/create"  element={ user ? <CreatePost /> : <Navigate to="/" />} />

    <Route path="/dashboard"  element={user ? <Dashboard /> : <Navigate to="/" />}  />
     
      </Routes>
      </div>
      
      
      <Footer />
      </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
}

export default App;
