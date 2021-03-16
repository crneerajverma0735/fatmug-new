import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserArticle, deleteUserArticle } from "../../actions/article";
import { url } from "../../global/config";
import { useHistory } from "react-router-dom";

const YourArticle = ({ userArticle, fetchUserArticle, deleteUserArticle }) => {
  const [userArticles, setuserArticles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchUserArticle();
  }, [fetchUserArticle]);

  useEffect(() => {
    if (userArticle.length > 0) {
      setuserArticles(userArticle);
    }
  }, [userArticle]);
  return (
    <div className='container-fluid'>
      <div className='row my-5 justify-content-center'>
        <div
          className='col-10'
          style={{ height: "5px", background: "grey" }}
        ></div>
        <div className='col-10 pt-3'>
          <h6>YOUR SUBMITTED ARTICLES</h6>
        </div>
        <div
          className='col-10'
          style={{ height: "5px", background: "grey" }}
        ></div>
        <div className='col-10'>
          {userArticle.length > 0 &&
            userArticle.map((value) => (
              <div className='row mt-3' key={value._id}>
                <div className='col-2' style={{ height: "8rem" }}>
                  <img
                    style={{ border: "1px solid black", height: "100%" }}
                    src={`${url}/uploads/${value.image_url}`}
                    className='img-fluid'
                    alt=''
                  />
                </div>
                <div
                  className='col-10 d-flex align-items-end'
                  style={{ height: "8rem" }}
                >
                  <div className='row'>
                    <div className='col-12'>
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
                    </div>
                    <div className='col-9'>
                      <p>{value.description.slice(0, 150)}...</p>
                    </div>
                    <div className='col-3 d-flex justify-content-end'>
                      <div>
                        <i
                          className='fa fa-pencil-square-o mr-5 edit-icon'
                          style={{ cursor: "pointer" }}
                          aria-hidden='true'
                          style={{ fontSize: "1.8rem" }}
                          onClick={() => {
                            return history.push(
                              "/publish?article_id=" + value._id
                            );
                          }}
                        ></i>
                      </div>
                      <div>
                        <i
                          className='fa fa-trash-o delete-icon'
                          style={{ cursor: "pointer" }}
                          aria-hidden='true'
                          style={{ fontSize: "1.8rem" }}
                          onClick={() =>
                            deleteUserArticle({ article_id: value._id })
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className='col-12 mt-4'
                  style={{ height: "2px", background: "grey" }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userArticle: state.article.userArticle,
});

export default connect(mapStateToProps, {
  fetchUserArticle,
  deleteUserArticle,
})(YourArticle);
