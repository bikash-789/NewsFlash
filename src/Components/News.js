import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "in", pageSize = 9, category = "general" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    updateNews();
  }, []);

  const updateNews = async () => {
    setLoading(true);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=0342dc1b262b4f39aec1c23ba92d4413&page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    await updateNews();
  };

  return (
    <div className="container my-3 d-flex flex-column justify-content-center align-items-center">
      <h1
        className="h1 mt-5 text-center text-uppercase p-4"
        style={{ fontFamily: "'El Messiri', 'sans-serif'" }}
      >
        Top Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        style={{ scroll: "auto" }}
      >
        <div className="row">
          {articles.map((article) => (
            <div
              key={article.url}
              className="col d-flex flex-wrap justify-content-center align-items-baseline col-sm-12 col-md-4 p-2 mx-sm-4 mx-md-0 my-3"
            >
              <NewsItem
                key={article.url}
                title={
                  article.title == null
                    ? ""
                    : article.title.slice(0, 41) + "..."
                }
                description={
                  article.description == null
                    ? article.content
                    : article.description.slice(0, 60) + "..."
                }
                imageUrl={
                  article.urlToImage == null
                    ? "https://www.salvationarmy.org.au/scribe/sites/longjetty/files/Church_News/news-3.jpg"
                    : article.urlToImage
                }
                newsUrl={article.url}
                author={article.author}
                publishedAt={article.publishedAt}
                source={article.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
