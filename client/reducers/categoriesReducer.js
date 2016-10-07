const categoriesReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "GET_CATEGORIES": {
      newState.categories = action.payload;
      break;
    }
  }
  return newState;
}

export default categoriesReducer;