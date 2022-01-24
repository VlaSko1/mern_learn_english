import { login, registration } from '../../actions/user';

export const SIGN_UP = 'AUTH::SIGN_UP';
export const LOG_IN = 'AUTH::LOG_IN';
export const LOG_OUT = 'AUTH::LOG_OUT';
export const SET_ERROR = 'AUTH::SET_ERROR';
export const DEL_MESSAGE_SIGN_UP = 'AUTH::DEL_MESSAGE_SIGN_UP';

export const createSignUP = (messageServer) => ({  // TODO доделай получение данных при авторизации
  type: SIGN_UP,
  payload: messageServer
});

export const createLogIn = (dataUser) => ({
  type: LOG_IN,
  payload: dataUser 
});

export const createLogOut = () => ({ // TODO реализуй выход пользователя
  type: LOG_OUT,
});

export const createSetError = (errorMessage) => ({
  type: SET_ERROR,
  payload: errorMessage,
});

export const createDelMessageSignUP = () => ({
  type: DEL_MESSAGE_SIGN_UP,
});

export const createSignInWithThunk = (email, password) => async (dispatch) => {
  dispatch(createSetError(""));
  
  try {
    const dataUser = await login(email, password); 
    if (typeof dataUser === "string") {
      dispatch(createSetError(dataUser));
    } else if ('user' in dataUser ) {
      dispatch(createLogIn(dataUser));
    } else {
      dispatch(createSetError(dataUser.message));
    }
    
  } catch (error) {
    dispatch(createSetError(error.message));
  }
};

export const createSignUpWithThunk = (name, email, password) => async (dispatch) => { 
  
  dispatch(createSetError(""));

  try {
    const messageServer = await registration(name, email, password);

    if (typeof messageServer === "string") {
      dispatch(createSetError(messageServer));
    } else {
      dispatch(createSignUP(messageServer.message));
    }
    
  } catch (error) {
    dispatch(createSetError(error.message));
    
  }
};