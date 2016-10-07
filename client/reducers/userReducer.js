const userReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "USERNAME_UPDATE": {
      newState.username = action.payload;
      break;
    }
  }
  return newState;
}

export default userReducer;