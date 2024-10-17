import React from 'react';
import ArticleForm from '../../components/Crud/ArticleForm';

const EditArticle: React.FC = () => {
  return (
    <div>
      <h1>Edit Article</h1>
      <ArticleForm isEditMode />
    </div>
  );
};

export default EditArticle;
