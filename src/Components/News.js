import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0342dc1b262b4f39aec1c23ba92d4413&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0342dc1b262b4f39aec1c23ba92d4413&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3 d-flex flex-column justify-content-center align-items-center">
        <h1
          className="h1 mt-5 text-center text-uppercase p-4"
          style={{ fontFamily: "'El Messiri', 'sans-serif'" }}
        >
          QWERTY - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          style={{ scroll: !"hidden" }}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div
                  key={element.url}
                  className="col d-flex flex-wrap justify-content-center align-items-baseline col-sm-12 col-md-4 p-2 mx-sm-4 mx-md-0 my-3"
                >
                  <NewsItem
                    key={element.url}
                    title={
                      element.title == null
                        ? (element.title = "")
                        : element.title.slice(0, 41) + "..."
                    }
                    description={
                      element.description == null
                        ? (element.description = element.content)
                        : element.description.slice(0, 60) + "..."
                    }
                    imageUrl={
                      element.urlToImage == null
                        ? "https://www.salvationarmy.org.au/scribe/sites/longjetty/files/Church_News/news-3.jpg"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
