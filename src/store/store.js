import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import createSagaMiddleware from 'redux-saga';
import rootReducer from "../reducer/index";
// import rootSaga from './saga';

const initialState = {};

const Store = createStore(rootReducer);

export default Store;
