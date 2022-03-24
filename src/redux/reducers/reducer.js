//To keep in initial Store as local storage
const initialCartState = []

export const storeReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(state)
      return [...state,  action.payload];
    case "REMOVE_ITEM":
      console.log(action.id)
      return state.filter(
          (prod) => prod.id !== action.id
        )
      case "GET_CARTITEMS":
        return action.cartItems;
    default:
      return state;
  }
};
