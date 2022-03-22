export const addItemsToCart = (payload) => ({
  type: "ADD_ITEM",
  payload,
});

export const removeItemsFromCart = (payload) => ({
  type: "REMOVE_ITEM",
  payload,
});
