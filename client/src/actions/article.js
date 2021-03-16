import axios from "axios";
import { FETCH_ALL_ARTICLE, FETCH_USER_ARTICLE } from "./Types";
import { setAlert } from "./alert";
import { url } from "../global/config";

// FETCH all article
export const fetchALLArticle = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({});

  try {
    const res = await axios.post(
      `${url}/api/article/fetch-all-articles`,
      body,
      config
    );

    dispatch({
      type: FETCH_ALL_ARTICLE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlert(errors[0].msg, "danger"));
    }
  }
};

// FETCH User article
export const fetchUserArticle = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({});

  try {
    const res = await axios.post(
      `${url}/api/article/fetch-user-article`,
      body,
      config
    );

    dispatch({
      type: FETCH_USER_ARTICLE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlert(errors[0].msg, "danger"));
    }
  }
};

// Delete User article
export const deleteUserArticle = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post(
      `${url}/api/article/delete-user-article`,
      body,
      config
    );

    dispatch(fetchALLArticle());
    dispatch(fetchUserArticle());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlert(errors[0].msg, "danger"));
    }
  }
};
