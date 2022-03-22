//To keep in initial Store as local storage
const initialCartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
};

export const storeReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (prod) => prod.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
