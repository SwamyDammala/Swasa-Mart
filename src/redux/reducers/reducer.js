//To keep in initial Store as local storage
const initialCartState = [];

export const storeReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "UPDATE_CART":
      // eslint-disable-next-line array-callback-return
      return state.map( item => {
        if (item.cartitem.cartitemId === action.id) {
          console.log(item);
          if (action.payload.updateState === "add") {
            return {
              ...item,
              cartitem: {
                ...item.cartitem,
                itemCount: item.cartitem.itemCount + 1,
              },
            };
          } else if (action.payload.updateState === "remove") {
            return {
              ...item,
              cartitem: {
                ...item.cartitem,
                itemCount: item.cartitem.itemCount - 1,
              },
            };
          }
        } else {
          return item;
        }
      });
    case "REMOVE_ITEM":
      return state.filter((prod) => prod.cartitem.cartitemId !== action.id);
    case "GET_CARTITEMS":
      return action.cartItems;
    default:
      return state;
  }
};
