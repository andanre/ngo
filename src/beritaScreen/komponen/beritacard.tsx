import React from 'react';


interface NewsCardProps {
  title: string;
  content: string;
  url: string;
  type: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, content, url, type }) => {
  
  return (
    <div className="card mb-3">
      <img src={url} className="img-thumbnail" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <a href={url} className="btn btn-primary">Read More</a>
        <span className="badge bg-secondary">{type}</span>
      </div>
    </div>
  );  
};

export default NewsCard;
