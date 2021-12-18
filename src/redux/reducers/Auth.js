import {
  AUTH_TOKEN,
  AUTH_BARANGAY,
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
  barangay: localStorage.getItem(AUTH_BARANGAY),
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/",
        token: action.token,
        barangay: action.barangay,
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
        barangay: action.barangay,
      };
    }
    case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
        barangay: action.barangay,
      };
    }
    default:
      return state;
  }
};

export default auth;
