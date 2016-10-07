const categoryTitleReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "CAT_TITLE": {
      newState.categoryTitle = action.payload;
      break;
    }
  }
  return newState;
}

export default categoryTitleReducer;