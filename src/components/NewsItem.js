import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsurl, author, date } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
        {/* <span class="badge rounded-pill bg-primary">+1</span> */}
          <img src={imageUrl? imageUrl : "https://static.dw.com/image/66692478_6.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-primary">
    By {author?author:"unknown"} on {new Date(date).toGMTString()}</small>
  </p>
            <a href={newsurl} target="_blank"  rel="noreferrer" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
