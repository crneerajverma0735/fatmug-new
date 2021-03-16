import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { url } from "../../global/config";

const WriteArticle = ({ location, setAlert }) => {
  const [oneArticle, setOneArticle] = useState([]);
  const article_ids = queryString.parse(location.search).article_id;

  const fetchUserArticle = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(data);

    try {
      const res = await axios.post(
        `${url}/api/article/fetch-one-article`,
        body,
        config
      );

      setOneArticle(res.data.article);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        setAlert(errors[0].msg, "danger");
      }
    }
  };

  useEffect(() => {
    if (article_ids && oneArticle.length < 1) {
      console.log(article_ids);
      fetchUserArticle({ article_id: article_ids });
    }
  }, [fetchUserArticle, article_ids]);

  return (
    <div className='container-fluid'>
      {oneArticle.length > 0 &&
        oneArticle.map((value) => (
          <div className='row justify-content-center my-5'>
            <div className='col-8 d-flex justify-content-center'>
              <img
                src={`${url}/uploads/${value.image_url}`}
                className='img-fluid'
                alt=''
              />
            </div>
            <div className='col-8 mt-5'>
              <div className='row'>
                <div className='col-9'>
                  <h4>{value.title}</h4>
                </div>
                <div
                  className='col-3 d-flex justify-content-around'
                  style={{ fontStyle: "italic" }}
                >
                  <div className='pl-5'>Jun 10</div>
                  <div style={{ fontWeight: "bold" }}>6 min read</div>
                </div>
              </div>
            </div>
            <div
              className='col-8 mt-3'
              style={{ height: "5px", background: "grey" }}
            ></div>
            <div className='col-8 pt-4'>
              <p>{value.description}</p>
            </div>
            <div className='col-8 mt-5' style={{ fontSize: "1.2rem" }}>
              <i
                className='fa fa-user-circle-o'
                aria-hidden='true'
                style={{ fontSize: "2.5rem" }}
              ></i>
              <span style={{ fontStyle: "italic" }} className='ml-3'>
                by
              </span>
              <span style={{ fontWeight: "bold" }} className='pl-1'>
                {value.user_name}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default connect(null, { setAlert })(WriteArticle);
