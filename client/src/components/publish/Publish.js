import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../alert/Alert";
import { url } from "../../global/config";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const Publish = ({ setAlert, location }) => {
  const [selectedFile, setSelectedFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oneArticle, setOneArticle] = useState([]);
  const [imgLink, setImgLink] = useState("");
  const article_ids = queryString.parse(location.search).article_id;
  const history = useHistory();

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
    if (oneArticle.length > 0) {
      setTitle(oneArticle[0].title);
      setDescription(oneArticle[0].description);
      setImgLink(oneArticle[0].image_url);
    }
  }, [oneArticle]);

  useEffect(() => {
    if (article_ids && oneArticle.length < 1) {
      console.log(article_ids);
      fetchUserArticle({ article_id: article_ids });
    }
  }, [fetchUserArticle, article_ids]);

  const uploadImage = (e) => {
    if (!e.target.files[0]) return;
    const fileSize = e.target.files[0].size / (1024 * 1024);
    const fileName = e.target.files[0].name;

    if (fileSize <= 5) {
      const fileExtensionArray = fileName.split(".");
      const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];
      if (
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png"
      ) {
        setSelectedFile(e.target.files[0]);
      } else {
        setAlert(
          "The file extension you are trying to upload is not allowed, extension allowed only(png, jpeg, jpg)",
          "danger"
        );
      }
    } else {
      setAlert("You cannot upload more then 5MB in size", "danger");
    }
  };

  const uploadArticle = async () => {
    const formData = new FormData();
    formData.append("productImage", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    if (article_ids !== undefined) {
      formData.append("article_id", article_ids);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post(
        `${url}/api/article/upload-article`,
        formData,
        config
      );

      setAlert(res.data.msg, "success");
      return history.push("/your-article");
    } catch (err) {
      console.log(err.response);
      const errors = err.response.data.errors;

      if (errors) {
        setAlert(errors[0].msg, "danger");
      }
    }
  };

  //
  const updateArticle = async () => {
    const data = {
      title: title,
      description: description,
      article_id: article_ids,
      image_url: imgLink,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(data);

    try {
      const res = await axios.post(
        `${url}/api/article/update-article`,
        body,
        config
      );

      setAlert(res.data.msg, "success");
      return history.push("/your-article");
    } catch (err) {
      console.log(err.response);
      const errors = err.response.data.errors;

      if (errors) {
        setAlert(errors[0].msg, "danger");
      }
    }
  };

  return (
    <div className='container-fluid'>
      <Alert />
      <div className='row justify-content-center my-5'>
        <div className='col-8'>
          <form>
            <div className='form-group'>
              <label for='pwd'>
                <h6>TITLE</h6>
              </label>
              <input
                type='text'
                className='form-control'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label for='comment'>
                <h6>DESCRIPTION</h6>
              </label>
              <textarea
                className='form-control'
                rows='5'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='customFile'
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              <label className='custom-file-label' for='customFile'>
                {Object.keys(selectedFile).length === 0 &&
                selectedFile.constructor === Object
                  ? "Upload File (JPG, PNG, JPEG upto 5MB & MP4 upto 100MB is allowed)"
                  : selectedFile.name}
              </label>
            </div>
          </form>
        </div>
        <div className='col-8 mt-5 d-flex justify-content-center'>
          <img
            src={
              Object.keys(selectedFile).length === 0 &&
              selectedFile.constructor === Object
                ? `${url}/uploads/${imgLink}`
                : URL.createObjectURL(selectedFile)
            }
            className='img-fluid'
            alt=''
            style={{ width: "100%", height: "50vh", objectFit: "cover" }}
          />
        </div>
        <div className='col-8 d-flex justify-content-center mt-5'>
          <button
            type='button'
            className='btn btn-info'
            onClick={() => {
              Object.keys(selectedFile).length === 0 &&
              selectedFile.constructor === Object
                ? updateArticle()
                : uploadArticle();
            }}
            style={{ width: "15rem" }}
          >
            Upload Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Publish);
