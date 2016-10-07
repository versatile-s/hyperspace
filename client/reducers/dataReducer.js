const dataReducer = function (state, action) {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case "GET_DATA": {
      newState.data = action.payload;
      break;
    }
  }
  return newState;
}

export default dataReducer;