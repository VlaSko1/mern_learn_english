import { SIGN_UP, LOG_IN, LOG_OUT, SET_ERROR,  DEL_MESSAGE_SIGN_UP, AUTH_TOKEN } from ".";

const defaultState = {
  currentUser: {},
  isAuth: false,
  error: '',
  messageSignUp: ''
};

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_TOKEN :
      return {
        ...state,
        currentUser: action.payload.user,
        isAuth: true,
        messageSignUp: ''
      }
    case LOG_IN :
      localStorage.setItem('tocken', action.payload.token);
      return {
        ...state,
        currentUser: action.payload.user,
        isAuth: true,
        messageSignUp: ''
      }
    case SET_ERROR : 
      return {
        ...state,
        error: action.payload
      }
    case SIGN_UP : 
      return {
        ...state,
        messageSignUp: action.payload

      }
    case DEL_MESSAGE_SIGN_UP :
      return {
        ...state, 
        messageSignUp: ''
      }
    case LOG_OUT : 
      localStorage.removeItem('tocken');;
      return {
        ...state,
        currentUser: {},
        isAuth: false
      }

    default: 
      return state;
    
  }
}
