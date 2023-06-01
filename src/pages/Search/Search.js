import React from 'react'

import styles from "./Search.module.css"


import { useFetchDocument } from '../../Hooks/useFetchDocument'

import { Link } from 'react-router-dom'

import { useQuery } from '../../Hooks/useQuery'
import PostDetails from '../../componentes/PostDetails'

const Search = () => {

    const query = useQuery()

    const search = query.get("q")
 
    const {documents: posts} = useFetchDocument("posts", search)

   

    
  return (
    <div className={styles.search_container}>
        <h2>Este é o Post que Você Procura</h2>

        {posts && posts.length == 0 && (
            <>
            <p>O Post que Você Procura Não Existe</p>

            <Link to="/" className="btn-btn-dark">
                Voltar
            </Link>

            </>
        
  )}

        {posts && posts.map((post) => (
            <PostDetails key={post.id} post={post} />

        ))}


    </div>
  )
}

export default Search