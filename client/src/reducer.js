import mylist from './assets/mylist.json'
import top100 from './assets/top100.json'
export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  recommend: mylist[1],
  top:mylist[1],
  wishlist: [],
  top_100:top100
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_RECOMMEND: "SET_RECOMMEND",
  SET_WISHLIST:"SET_WISHLIST",
  SET_TOP:"SET_TOP"
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
      case actionTypes.SET_TOP:
      return {
        ...state,
        top_100: action.top_100,
      };

    default:
      return state;
  }
};
export default reducer;
