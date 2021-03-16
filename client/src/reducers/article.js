import {
  FETCH_ALL_ARTICLE,
  FETCH_ONE_ARTICLE,
  FETCH_USER_ARTICLE,
  DELETE_ARTICLE,
} from "../actions/Types";

const initialState = {
  allArticle: [],
  userArticle: [],
  getOneArticle: [],
  loading: true,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_ARTICLE:
      return {
        ...state,
        loading: false,
        allArticle: payload.article,
      };
    case FETCH_ONE_ARTICLE:
      return {
        ...state,
        getOneArticle: payload.article,
        loading: false,
      };

    case FETCH_USER_ARTICLE:
      return {
        ...state,
        userArticle: payload.article,
        loading: false,
      };
    default:
      return state;
  }
}
