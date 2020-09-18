import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import counterReducer from '../features/counter/counterSlice';
import signinReducer from '../features/signin/slice';
import signupReducer from '../features/signup/slice';
import homeReducer from '../features/home/slice';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  signin: signinReducer,
  signup: signupReducer,
  home: homeReducer,
});
export default configureStore({
  reducer: rootReducer,
});
