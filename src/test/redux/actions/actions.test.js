import {
  addItemsToCart,
  removeItemsFromCart,
  updateItemsFromCart,
  startAddItemsToCart,
  startRemoveItemsFromCart,
  startUpdateItemsFromCart,
} from "../../../redux/actions/actions";

test("add Cart Items action method in actions", () => {
  const userInfo = {
    email: "Test@gmail.com",
    userId: "test",
  };
  const prodInfo = {
    category: "test",
    title: "Product1",
    description: "Product description",
    id: "TestId123",
    price: 12,
    image: "imageUrl",
    rating: {
      count: 100,
      rate: 2.2,
    },
  };
  const cartitem = { ...userInfo, ...prodInfo, itemCount: 1 };
  const action = addItemsToCart(cartitem);
  expect(action).toEqual({
    type: "ADD_ITEM",
    payload: cartitem,
  });
});

test("Update cartItems increase cart items action method from actions", () => {
  const id = "Test123";
  const updateCount = 2;
  const updateState = "add";

  const action = updateItemsFromCart(id, updateCount, updateState);
  expect(action).toEqual({
    type: "UPDATE_CART",
    id: "Test123",
    payload: updateCount,
    updateState: "add",
  });
});

test("Update cartItems decrease cart items action method from actions", () => {
    const id = "Test123";
    const updateCount = 2;
    const updateState = "remove";
  
    const action = updateItemsFromCart(id, updateCount, updateState);
    expect(action).toEqual({
      type: "UPDATE_CART",
      id: "Test123",
      payload: updateCount,
      updateState: "remove",
    });
  });

  test("remove cartItems action method from actions", () => {
    const id = "Test123";  
    const action = removeItemsFromCart(id);
    expect(action).toEqual({
      type: "REMOVE_ITEM",
      id: "Test123",
    });
  });

