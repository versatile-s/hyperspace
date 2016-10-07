import { combineReducers, createStore } from 'redux';
import authReducer from './reducers/authReducer';
import categoriesReducer from './reducers/categoriesReducer';
import categoryTitleReducer from './reducers/categoryTitleReducer';
import dataReducer from './reducers/dataReducer';
import openReducer from './reducers/openReducer';
import searchedHypersReducer from './reducers/searchedHypersReducer';
import selfReducer from './reducers/selfReducer';
import toggleReducer from './reducers/toggleReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  authenticated: authReducer,
  categories: categoriesReducer,
  categoryTitle: categoryTitleReducer,
  data: dataReducer,
  open: openReducer,
  searchedHypers: searchedHypersReducer,
  self: selfReducer,
  toggled: toggleReducer,
  username: userReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log('store changed', store.getState());
});

export default store;