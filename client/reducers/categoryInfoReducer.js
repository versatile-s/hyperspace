const categoryInfoReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "CAT_INFO": {
      newState.categoryInfo = action.payload;
      break;
    }
  }
  return newState;
}

export default categoryInfoReducer;