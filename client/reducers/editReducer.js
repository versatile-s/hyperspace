const editReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "EDIT_SWITCH": {
      newState.edit = action.payload;
      break;
    }
  }
  return newState;
}

export default editReducer;