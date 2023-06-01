import styles from "./CreatePost.module.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useInsertDocument } from "../../Hooks/useInsertDocuments";

import { useAuthvalue } from "../../contexto/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthvalue();

  

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar Imagem url

    try {

      new URL (image)
      
    } catch (error) {

      setFormError("Para fazer o Post a Imagem precisar ser uma URL")
      
    }


    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())
  

    // Checar todos valores

    if(!title || !image || !tags || !body ) {
      setFormError("Por Favor, Preencha todos os campos")
    }

    if (formError) return;
    


    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/") // Aqui quando clica para postar ja vai direto para Home

    
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}


        {response.error && <p className="error">{response.error}</p>}

        {formError && <p className="error">{formError}</p>}
        
      </form>
    </div>
  );
};

export default CreatePost;