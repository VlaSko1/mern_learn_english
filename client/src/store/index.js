import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { usersReducer } from "./users";
import { wordsReducer } from "./words";
import { dictionariesReducer } from "./dictionaries";



const rootReducer = combineReducers( {
  users: usersReducer,
  words: wordsReducer,
  dictionaries: dictionariesReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));