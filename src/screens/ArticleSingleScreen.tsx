import Header from "../components/Header";
import { Showarticle } from "./ArticleManagement/Showarticle";
import './ArticleSingleScreen.css';
import Maintainance001 from "../components/UnderMaintanance";
import Footer from "../components/Footer";

export const ArticleSingleScreen = () => {
  return (
    <>
      <Header />
      <div className="article-single-container">
        <Showarticle/>
      </div>
      <Maintainance001 />
      <Footer />

    </>
  );

};
