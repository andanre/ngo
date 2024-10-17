import { ArticleType } from "../../components/types"
import { useEffect, useState } from "react";
import "./Showarticle.css";


// Component to display a single article
export const Article0 = ({ data }: { data: ArticleType }) => {
    

    return (
        <div className="article-single-container">
            <div className="article-card-single">
                <h2>{data.title}</h2>
                <img src={data.image} alt={data.title} />
                <div className="article-content-single">
                    <p>{data.description}</p>
                    <a href={data.link} className="readmore">Baca Selengkapnya</a>
                </div>
            </div>
        </div>

    );
};

// Component to fetch and display a list of articles
export const Showarticle = () => {
    const [articles, setArticles] = useState<ArticleType[]>([]);

    useEffect(() => {
        // fetch("https://berita-indo-api-next.vercel.app/api/cnn-news/nasional")
        fetch("http://localhost:5000/news-berita")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Log the data to check its structure
                // Check if data.data exists and is an array
                if (Array.isArray(data)) {
                    // Map the data to ArticleType
                    const formattedArticles: any = data.map((article: any) => ({
                        id: article.id,
                        title: article.title,
                        link: article.link,
                        description: article.contentSnippet,
                        image: article.image?.large || article.image?.small || '', // Use large image if available, else use small, or empty string if both are missing
                        date: article.isoDate ? new Date(article.isoDate).toLocaleDateString() : ""
                    }));

                    setArticles(formattedArticles);
                } else {
                    console.error("API returned invalid data format:", data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            {articles.length > 0 ? (
                articles.slice(1, 2).map((article, index) => <Article0 key={index} data={article} />)
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
