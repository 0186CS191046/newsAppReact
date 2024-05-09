import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component"

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  
  constructor(props) {
    super(props);
    console.log("this is constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.captalizeFirstLetter(this.props.category)} - NewsApp`
  }
  captalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
  async updateNews() {
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(60)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d21e75b0de8a4ae6824efcb1813891a6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews()
  }

  handlePreviousButton = async () => {
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=d21e75b0de8a4ae6824efcb1813891a6&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false,
    // });
    this.setState({page:this.state.page-1})
    this.updateNews()
  };

  handleNextButton = async () => {
    // console.log("next");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=d21e75b0de8a4ae6824efcb1813891a6&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     loading: false,
    //   });
    // }
    this.setState({page:this.state.page+1})
    this.updateNews()
  };
  fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "25px 0" }}>
          NewsApp - Top {this.captalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {
            this.state.articles.map((elements) => {
              return (
                <div className="col-md-4" key={elements.url}>
                  <NewsItem
                    title={elements.title ? elements.title : ""}
                    description={
                      elements.description ? elements.description : ""
                    }
                    imageUrl={
                      elements.urlToImage
                        ? elements.urlToImage
                        : "https://www.shutterstock.com/image-photo/young-student-watching-lesson-online-260nw-1676998306.jpg"
                    }
                    newsurl={elements.url}
                    author={elements.author}
                    date={elements.publishedAt}
                  />
                </div>
              );
            })}
        </div></div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousButton}
          >
            {" "}
            &laquo; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextButton}
          >
            Next &raquo;
          </button>
        </div> */}
      </>
    );
  }
}
