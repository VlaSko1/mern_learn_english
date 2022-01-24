import { SIGN_UP, LOG_IN, LOG_OUT, SET_ERROR } from ".";

const defaultState = {
  currentUser: {},
  isAuth: false,
  error: '',
  messageSignUp: ''
};

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN :
      return {
        ...state,
        currentUser: action.payload,
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


    default: 
      return state;
    
  }
}
