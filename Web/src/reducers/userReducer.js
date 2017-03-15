export function userReducer(state = {}, action){
  switch (action.type) {
    case "MYSELF":
      return {
        user: action.user
      };
    case "BE_COACH":
      let user = state.user
      user.role = "coach";
      return {
        user: user
      }
    default:
      return state;
  }
}
