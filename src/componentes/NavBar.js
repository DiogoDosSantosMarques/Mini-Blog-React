import { NavLink,  } from "react-router-dom"

import { useAuthentication } from "../Hooks/useAuthentication"

import { useAuthvalue } from "../contexto/AuthContext" // Pra pegar o valor do contexto

import styles from "./NavBar.module.css"

const NavBar = () => {

const {user} = useAuthvalue()

const { logout } = useAuthentication()


  return (
    <div>

        <nav className={styles.navbar}>
        <NavLink className={styles.brand}  to="/">
            Daylly <span>Blog</span>
        </NavLink>

        <ul className={styles.links_list}>

        <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
        </li>

        <li>
        <NavLink to="/search" className={({ isActive }) => (isActive ? styles.active : "")}>Buscar</NavLink>
        </li>



        {/* Se não existir Usuário ainda. Aparecer o NavBar de Cadastro e Login*/}
      {!user && ( 
        <>

       
        
        <li>
        <NavLink to="/cadastro" className={({ isActive }) => (isActive ? styles.active : "")}>Cadastro</NavLink>
        </li>

        <li>

        <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Login</NavLink>

        </li>
        
        </>
      )}



      {user && (
  <>
  <li>
    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "") }>Dashboard</NavLink>
  </li>

  <li>
    <NavLink to="/post/create" className={({ isActive }) => (isActive ? styles.active : "") }>Criar Post</NavLink>
  </li>


  </>

      )}

        <li>

        <NavLink to="/sobre" className={({ isActive }) => (isActive ? styles.active : "")}>Sobre</NavLink>

        </li>

        {user && (
          <li>

          <button onClick={logout}>Sair</button>
        </li>
        )}

        </ul>


       
        </nav>
    </div>
  )
}

export default NavBar