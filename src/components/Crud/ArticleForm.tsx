import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../../types';
import "./style.css"

interface ArticleFormProps {
  isEditMode?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ isEditMode }) => {
  const [article, setArticle] = useState<Partial<Article>>({});
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEditMode && id) {
      
    }
  }, [isEditMode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && id) {
    
    } else {
      
    }
  };

  return (
    <div className='article-form-container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='title' htmlFor='title'>Title</label>
          <input
            className='form-control'
            type="text"
            name="title"
            value={article.title || ''}
            onChange={handleChange}
            placeholder="Title"
            id='title'
          />
        </div>

        <input
          className='form-control'

          type="text"
          name="link"
          value={article.link || ''}
          onChange={handleChange}
          placeholder="link"
        />
        <textarea
          className='form-control'
          rows={8}
          name="contentSnippet"
          value={article.contentSnippet || ''}
          onChange={handleChange}
          placeholder="contentSnippet"
        />
        <input
          className='form-control'

          type="text"
          name="isoDate"
          value={article.isoDate || ''}
          onChange={handleChange}
          placeholder="Publish di tanggal"
        />
        <input
          className='form-control'

          type="text"
          name="image"
          value={article.image || ''}
          onChange={handleChange}
          placeholder="Link URL gambar"
        />
        <button type="submit">{isEditMode ? 'Update' : 'Create'} Article</button>
      </form>
    </div>
  );
};

export default ArticleForm;
// function fetchArticleById(arg0: number) {
//   throw new Error('Function not implemented.');
// }

// function updateArticle(arg0: number, article: Partial<Article>) {
//   throw new Error('Function not implemented.');
// }

