import {
  addItemsToCart,
  removeItemsFromCart,
  updateItemsFromCart,
  startAddItemsToCart,
  startRemoveItemsFromCart,
  startUpdateItemsFromCart,
} from "../../../redux/actions/actions";

test("add Cart Items method in actions", () => {
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

test("Update cartItems increase cart items method from actions", () => {
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

    const action=updateItemsFromCart()
})