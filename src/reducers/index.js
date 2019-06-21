import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { searchReducer } from './search';

const reducers = {
  modal: modalReducer,
  search: searchReducer,
};

export default combineReducers(reducers);
