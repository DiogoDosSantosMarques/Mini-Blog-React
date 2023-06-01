import { db } from "../firebase/config";


import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} 
from "firebase/auth";

import {useState, useEffect} from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

  

    // Aqui vou criar um useState para lidar com ações futuras do componente para n foder a memoria
    const [cancelled, setCancelled] = useState(false)
    // Aqui vou criar um useState para lidar com ações futuras do componente para n foder a memoria


    const auth = getAuth() // isso vem la do Firebase 


    //Função do Cleanup // Evitar Vazamento de Memória
    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }
    //Função do Cleanup  Evitar Vazamento de Memória



    // Agora Vamos Registrar o Usuário no Sistema

    const createUser = async (data) => {
        checkIfIsCancelled();
    
        setLoading(true)

        
        // Aqui tem um try catch que vai tentar cadastrar usando email e senha passando pela autenticação criada la em cima, e por fim um await do updateProfile pra atualizar o perfil
        try {
            const {user} = await createUserWithEmailAndPassword (
                auth,
                data.email,
                data.senha
            )
                
            await updateProfile(user, {
                displayName: data.nome
            })

            setLoading(false)
            return user;
            
            
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "A Senha Precisa ter pelo menos 6 Caracteres"
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "Email Ja Cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um Erro"
            }

            setLoading(false)
            setError(systemErrorMessage)
            
        }

        

    }

    // Função do Logout

    const logout = () => {

        checkIfIsCancelled() //Memory Liquid

        signOut(auth)
    }



    // Login

    const login = async (data) => {
        checkIfIsCancelled();
    
        setLoading(true);
        setError(false);
    
        try {

          await signInWithEmailAndPassword(auth, data.email, data.password);
          setLoading(false);

        } catch (error) {

         
    
          let systemErrorMessage;
    
          if (error.message.includes("user-not-found")) {
            systemErrorMessage = "Usuário não encontrado.";
          } else if (error.message.includes("wrong-password")) {
            systemErrorMessage = "Senha incorreta.";
          } else {
            systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
          }

          setError(systemErrorMessage);
          setLoading(false);
    
          
        }
      
      };

    useEffect(() => { //Esse useEffect é para o tratamento de Memory Liquid
        return setCancelled(true)
        
    }, []) // Array de Dependências Vazio pra executar UMA VEZ SÓ






    

    // Aqui é o retorno das coisas que criei
    return {
        auth, // Autenticação
        createUser, //Criar Usuário e Salvar no Banco de Dados Firebase
        error, // o Erro com o state de NULL
        loading, //
        logout,
        login,
        
    }


}