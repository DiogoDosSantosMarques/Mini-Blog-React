                                 // HOOK DE RESGATE DE DADOS
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

import { useState, useEffect } from "react";

// Collection = Coleção de Dados que vem do firebase

// Query =  para pegar os dados

// Where = Para fazer um filtro dos dados que estão sendo trazidos


export const useFetchDocument = (docCollection, search = null, uid = null) => { // uid = pegar os posts do usuário para colocar no dashboard


    const [documents, setDocuments] = useState(null)
    const [erro, setErro] = useState(null)
    const [loading, setLoading] = useState(null)



    // Lidar com vazamento de memória
    const [cancelled, setCancelled] = useState(false);
     // Lidar com vazamento de memória


  
    useEffect(() => {

        async function loadData() {
            if(cancelled) return;

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {

                let q //Essa é uma variável query

               // Aqui é uma busca de dados pela ordem de criação decrescente, então se uma pessoa faz um post esse código coloca na home em ordem pela hora que foi postado decrescente


                if(search) {
                    q = await query (collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc")) // vai tentar buscar um arquivo ou post la na coleção onde vai ter um array 

                } else {

                    q = await query(collectionRef, orderBy("createdAt", "desc"))

                }

                await onSnapshot(q, (querysnapshoot) => {
                    setDocuments( // Os documentos que vem do Firebase vem com coisas a mais desnecessários por isso tem que fazer essa fitragem aqui no setDocuments

                   querysnapshoot.docs.map((doc) => ({
                    id: doc.id, // o id vem solto
                    ...doc.data(), // Aqui é o resto da postagem, body, titulo e e tc

                   }))

                    )

                })

                    

                

                setLoading(false)

                
            } catch (error) {

                console.log(error)
                setErro(error.message)

                
            }
        }

        loadData()

    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)

    }, [])

return {documents, loading, erro}

}