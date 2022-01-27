import mylist from './assets/mylist.json'
export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  recommend: mylist[1],
  top:mylist[1],
  wishlist: []
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_RECOMMEND: "SET_RECOMMEND",
  SET_WISHLIST:"SET_WISHLIST"
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
      case actionTypes.SET_RECOMMEND:
      return {
        ...state,
        recommend: action.recommend,
      };
      case actionTypes.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.wishlist,
      };

    default:
      return state;
  }
};
export default reducer;
