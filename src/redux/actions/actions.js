import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc
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

export const updateItemsFromCart = (id, payload, updateState) => ({
  type: "UPDATE_CART",
  id,
  payload,
  updateState,
});

//making adding cart items asynchronoulsy in Fire DB
export const startAddItemsToCart = (cartItem = {}) => {
  return async (dispatch) => {
    try {
      const cartData = await addDoc(collection(db, "cartItems"), cartItem);
      console.log(cartItem.itemCount);
      dispatch(
        addItemsToCart({
          //changing format of cartitem object whic matches state cartitem object
          cartitem: {
            ...cartItem.prod,
            cartitemId: cartData.id,
            ...cartItem.currentUserInfo,
            itemCount: cartItem.itemCount,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const startRemoveItemsFromCart = (id) => {
  return async (dispatch) => {
    console.log(id);
    try {
      await deleteDoc(doc(db, "cartItems", id));
      dispatch(removeItemsFromCart(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startUpdateItemsFromCart = (id, updateItem, updateState) => {
  return async (dispatch) => {
    console.log(id, updateItem);
    try {
      await updateDoc(doc(db, "cartItems", `${id}`), { itemCount: updateItem });
      dispatch(
        updateItemsFromCart(id, {
          cartitem: {
            ...updateItem
          },
          updateState,
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
        cartitem: {
          ...cartItem.data().prod,
          cartitemId: cartItem.id,
          ...cartItem.data().currentUserInfo,
          itemCount: cartItem.data().itemCount,
        },
      });
    });
    dispatch(getCartItems(cartItemsArr));
  };
};
