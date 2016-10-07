const toggleReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "TOGGLE_SWITCH": {
      newState.toggle = action.payload;
      break;
    }
  }
  return newState;
}

export default toggleReducer;