import React, { useState, useEffect } from "react";
import { url } from "../../global/config";
import { useHistory } from "react-router-dom";

function Welcome({ article }) {
  const [Article, setArticle] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (article.length > 0) {
      setArticle([...article]);
    }
  }, [article]);

  return (
    <div className='container-fluid'>
      <div className='row mb-5'>
        <div className='col-8'>
          <div className='row'>
            {Article.length > 0 &&
              Article.map((value) => (
                <div className='col-11 mt-5' key={value._id}>
                  <div className='card'>
                    <img
                      src={`${url}/uploads/${value.image_url}`}
                      className='card-img-top'
                      alt=''
                    />
                    <div className='card-body'>
                      <h6 className='card-subtitle mb-2 text-muted'>
                        {value.user_name}
                      </h6>
                      <h5
                        className='card-title'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          return history.push(
                            "/write-article?article_id=" + value._id
                          );
                        }}
                      >
                        {value.title}
                      </h5>
                      <p className='card-text'>{value.description} </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='col-4'>
          <div className='row mt-5'>
            <div className='col-12'>
              <div style={{ height: "5px", background: "grey" }}></div>
              <h5 className='pt-3'>TOP ARTICLES</h5>
              <div style={{ height: "5px", background: "grey" }}></div>
            </div>
          </div>

          {article.length > 0 &&
            article.slice(0, 6).map((value) => (
              <div
                className='row my-2'
                key={value._id}
                style={{ height: "20vh" }}
              >
                <div className='col-8 mr-0 pr-0'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='card'>
                        <div className='card-body'>
                          <p className='card-subtitle mb-4 text-muted'>
                            {value.user_name}
                          </p>
                          <h6
                            className='card-title'
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              return history.push(
                                "/write-article?article_id=" + value._id
                              );
                            }}
                          >
                            {value.title}
                          </h6>
                          <div className='row'>
                            <span className='col-4'>jun10 </span>
                            <span className='col-6'> 6 min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-4 ml-0 pl-0' style={{ height: "20vh" }}>
                  <img
                    style={{
                      border: "1px solid black",
                      height: "20vh",
                      objectFit: "cover",
                    }}
                    src={`${url}/uploads/${value.image_url}`}
                    className='img-fluid'
                    alt=''
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
