import {
  AUTH_TOKEN,
  AUTH_ORGANIZATION,
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
} from "../constants/Auth";
const initState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  token: localStorage.getItem(AUTH_TOKEN),
  organization: localStorage.getItem(AUTH_ORGANIZATION),
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/",
        token: action.token,
        organization: action.organization,
      };
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
        showMessage: false,
      };
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        redirect: "/",
        loading: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
        organization: action.organization,
      };
    }
    case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
        organization: action.organization,
      };
    }
    default:
      return state;
  }
};

export default auth;
