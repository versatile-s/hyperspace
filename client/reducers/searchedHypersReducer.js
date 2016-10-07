const searchedHypersReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "S_HYPERS": {
      newState.searchedHypers = action.payload;
      break;
    }
  }
  return newState;
}

export default searchedHypersReducer;