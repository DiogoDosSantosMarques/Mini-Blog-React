import { useState, useEffect, useReducer } from "react"

import { db } from "../firebase/config"

import { collection, addDoc, Timestamp } from "firebase/firestore"



const initialState =  {
    loading: null,
    error: null
}


const insertReducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return { loading: true, error: null };
      case "INSERTED_DOC":
        return { loading: false, error: null };
      case "ERROR":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const checkCancelBeforeDispatch = (action) => {
      if (!cancelled) {
        dispatch(action);
      }
    };
    // deal with memory leak




const insertDocument = async (document) => {

    checkCancelBeforeDispatch({
        type: "LOADING",
       
    })

    try {

        const newDocument = {...document, createdAt: Timestamp.now()}

        const insertedDocument = await addDoc(
            collection(db, docCollection), // Aqui vai tentar achar a coleção que eu quero e add newDocument
            newDocument
        )

        checkCancelBeforeDispatch({
            type: "INSERTED_DOCUMENT",
            payload: insertedDocument
           
        })
      
        
    } catch (error) {

        checkCancelBeforeDispatch({
            type: "ERROR",
            payload: error.message
           
        })
        
    }
}

useEffect(() => {
    return() => setCancelled(true)
}, {})

//Vazamentos de memória: Se a memória alocada não for liberada adequadamente quando não for mais necessária, ocorrerá um vazamento de memória. Isso significa que a memória não estará mais disponível para uso, resultando em um consumo progressivo de memória durante a execução do programa. Com o tempo, esses vazamentos podem levar à falta de memória disponível e causar falhas no programa.


return {insertDocument, response}


}



  



