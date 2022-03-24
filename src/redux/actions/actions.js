import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebase";

//To add items in cart state
export const addItemsToCart = (payload) => ({
  type: "ADD_ITEM",
  payload,
});

//To remove items from cart state
export const removeItemsFromCart = (id) => ({
  type: "REMOVE_ITEM",
  id,
});

export const startRemoveItemsFromCart = (id) => {
  return async (dispatch) => {
    console.log(id)
    try {
      await deleteDoc(doc(db, "cartItems", id))
      dispatch(removeItemsFromCart(id))
    } catch (error) {
      console.log(error)
    } 
  };
};

//making adding cart items asynchronoulsy in Fire DB
export const startAddItemsToCart = (cartItem = {}) => {
  return async (dispatch) => {
    try {
      const cartData = await addDoc(collection(db, "cartItems"), cartItem);
      dispatch(
        addItemsToCart({
          id: cartData.id,
          ...cartItem,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//To get cart items
export const getCartItems = (cartItems) => ({
  type: "GET_CARTITEMS",
  cartItems,
});

//To gt Cart items from Fire DB
export const startGetCartItems = () => {
  return async (dispatch) => {
    const cartItemsData = await getDocs(collection(db, "cartItems"));
    const cartItemsArr = [];
    cartItemsData.forEach((cartItem) => {
      cartItemsArr.push({
        id: cartItem.id,
        ...cartItem.data()
      });
    });
    dispatch(getCartItems(cartItemsArr));
  };
};
