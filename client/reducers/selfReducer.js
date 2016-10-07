const selfReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "SELF": {
      newState.self = action.payload;
      break;
    }
  }
  return newState;
}

export default selfReducer;