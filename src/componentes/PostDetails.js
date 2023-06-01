                    // Hook de Props que vai ser passado para Home dando vida ao post
import React from 'react'
import styles from "./PostDetail.module.css"


import { Link } from 'react-router-dom'

const PostDetails = ({ post }) => {
  return (
    <div className={styles.post_detail}>

        <p className={styles.createdby}>{post.createdBy}</p>

        <h2>{post.title}</h2>

    <img src={post.image} alt="" />

    <p>{post.body}</p>

    <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
            <p key={tag}><span>#</span>{tag}</p>

        ))}
    </div>






    </div>


  )
}

export default PostDetails