import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
country : "in",
pageSize: 6,
category:'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
  }
  constructor() {
    super();
    console.log("this is constructor");
    this.state = {
      articles: [],
      loading: false,
      page : 1,
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d21e75b0de8a4ae6824efcb1813891a6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles ,totalResults:parsedData.totalResults,loading:false});
  }

  handlePreviousButton = async()=>{
    console.log("previous")
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d21e75b0de8a4ae6824efcb1813891a6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles,page : this.state.page-1 ,loading:false});
  }

  handleNextButton = async()=>{
    console.log("next")
    if(!(this.state.page  +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d21e75b0de8a4ae6824efcb1813891a6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles ,page : this.state.page+1,loading:false});
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'25px 0'}}>NewsApp - Top Headlines</h1>
        {this.state.loading && <Spinner/>}

        <div className="row">
          {!this.state.loading && this.state.articles.map((elements) => {
            return <div className="col-md-4" key={elements.url}>
              <NewsItem
                title={elements.title ? elements.title : ""}
                description={elements.description ? elements.description : ""}
                imageUrl={elements.urlToImage?elements.urlToImage:"https://www.shutterstock.com/image-photo/young-student-watching-lesson-online-260nw-1676998306.jpg"}
                newsurl={elements.url}
              />
            </div>
  })}
        </div>
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePreviousButton}> &laquo; Previous</button>
        <button disabled = {(this.state.page  +1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextButton}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}
