const openReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "OPEN": {
      newState.open = action.payload;
      break;
    }
    case "CLOSE": {
      newState.open = action.payload;
      break;
    }
  }
  return newState;
}

export default openReducer;