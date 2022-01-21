import mylist from './assets/mylist.json'
export const initialState = {
  user: localStorage.getItem("user"),
  recommend: mylist[1],
  top:mylist[1],
  loading: false
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_RECOMMEND: "SET_RECOMMEND",
  SET_LOADING:"SET_LOADING"
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
      case actionTypes.SET_LOADING:
      return {
        ...state,
        recommend: action.loading,
      };

    default:
      return state;
  }
};
export default reducer;
