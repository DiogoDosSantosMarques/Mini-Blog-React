import {useEffect, useState} from "react"

import styles from "./Cadastro.module.css"
import { useAuthentication } from "../../Hooks/useAuthentication"

const Cadastro = () => {

// Entradas de Input Cadastro
const [nome, setNome] = useState("")
const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")
const [confirmarSenha, setConfirmarSenha] = useState("")
const [error, setError] = useState("")



const {createUser, error: authError, loading} = useAuthentication(); // os Conchetes são por causa que to importando


// botão e
const handleSubmit = async (e) => {
 
  e.preventDefault() //Não ficar recarregando a página 

  setError("")

  
  //Formando usuário baseado nos inputs
  const user = {
     nome,
    email,
    senha,
    
  }


  // Validação pra Confirmar Senha

  if(confirmarSenha !== senha) {
    setSenha("")
  setConfirmarSenha("")
  setError("As senhas não estão Iguais")
    return;

    

  } 
  setNome("")
  setEmail("")
  setSenha("")
  setConfirmarSenha("")




  const res = await createUser(user)
    console.log(res);

  

 
   
}

useEffect(() => {
  if(authError) {
    setError (authError)
  }

}, [authError]) 

  return (
    <div className={styles.register}>
      <h2>Cadastra-se Já Para Fazer seus Posts</h2>
<form onSubmit={handleSubmit}>

<label> <span> Nome: </span>
<input type="name" placeholder="Coloque seu Nome" required value={nome} onChange={(e) => setNome (e.target.value)}  />
</label>


<label> <span> E-mail: </span>
<input type="email" placeholder="Coloque seu Email" required value={email} onChange={(e) => setEmail (e.target.value)} />
</label>

<label> <span> Senha: </span>
  <input type="password" placeholder="Coloque sua Senha" required value={senha} onChange={(e) => setSenha (e.target.value)} />

</label>

<label> <span> Confirmar Senha: </span>
  <input type="password" placeholder="Confirme sua Senha" name="confirmPassword" required value={confirmarSenha} onChange={(e) => setConfirmarSenha (e.target.value)} />

</label>

{!loading && <button className="btn">Enviar</button>}

{loading && (<button className="btn" disabled>Aguarde</button> )}




{/* Html do Erro caso a senha não for igual a de confirmar*/}
{error && <p className="error">{error}</p>}
 {/* Se o erro existir mostrar em pro usuário que está errado */}

</form>


    </div>
  )
}

export default Cadastro