import React from "react";

const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  publishedAt,
  source,
}) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={imageUrl}
        className="card-img-top"
        alt="news-art"
        style={{ objectFit: "cover", height: "200px", overflow: "hidden" }}
      />
      <div
        className="card-body"
        style={{ minHeight: "280px", maxHeight: "300px" }}
      >
        <h5 className="card-title">{title}</h5>
        <span
          class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ zIndex: "2", left: "90%" }}
        >
          {source}
          <span class="visually-hidden">unread messages</span>
        </span>
        <div
          className="overflow-hidden"
          style={{ minHeight: "70px", maxHeight: "70px" }}
        >
          <p className="card-text" style={{ textAlign: "justify" }}>
            {description}
          </p>
        </div>
        <p className="card-text">
          <small className="text-muted">
            By {author == null ? "Unknown" : author} on{" "}
            {new Date(publishedAt).toGMTString()}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
