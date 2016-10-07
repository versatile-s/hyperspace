const authReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "AUTH_SUCCESS": {
      newState.authenticated = action.payload;
      break;
    }
    case "AUTH_FAIL": {
      newState.authenticated = action.payload;
      break;
    }
  }
  return newState;
}

export default authReducer;