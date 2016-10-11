import { combineReducers, createStore } from 'redux';
import authReducer from './reducers/authReducer';
import categoriesReducer from './reducers/categoriesReducer';
import categoryInfoReducer from './reducers/categoryInfoReducer';
import dataReducer from './reducers/dataReducer';
import editReducer from './reducers/editReducer';
import openReducer from './reducers/openReducer';
import searchedHypersReducer from './reducers/searchedHypersReducer';
import selfReducer from './reducers/selfReducer';
import toggleReducer from './reducers/toggleReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  authenticated: authReducer,
  categories: categoriesReducer,
  categoryInfo: categoryInfoReducer,
  data: dataReducer,
  open: openReducer,
  searchedHypers: searchedHypersReducer,
  self: selfReducer,
  toggled: toggleReducer,
  username: userReducer,
  edit: editReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log('Store: ', store.getState());
});

export default store;