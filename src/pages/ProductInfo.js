/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { useParams } from "react-router";
import Layout from "../components/Layout/Layout";
import { useDispatch,useSelector } from "react-redux";
import {  startAddItemsToCart,startUpdateItemsFromCart } from "../redux/actions/actions";
import { db } from "../firebase/firebase";

const ProductInfo = (props) => {
  const param = useParams();
  console.log(param);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);

   //To get the cart items from redux store
   const { cartItems } = useSelector((state) => ({
    cartItems: state.cartReducer,
   }));

     //Current Login user Session details
     const currentUserInfo={
      email: JSON.parse(localStorage.getItem("loginUser")).email,
      userId: JSON.parse(localStorage.getItem("loginUser")).uid,
    }
  
  //Filter our curent user cart items from all cart items
  const currentUserCartItems = cartItems.filter(
    (item) => item.cartitem.userId === currentUserInfo.userId
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const product = await getDoc(doc(db, "products", `${param.productId}`));
      console.log(product.data());
      setProduct(product.data());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };



  //Adding or Removing cart items from cart page
  const handleUpdateCartItem = (prod) => {
    console.log("Checking this now", prod);
    //getting exisiting product details in cart page into bewlo array based on product id
    const updatedInfo = currentUserCartItems.filter(
      (item) => item.cartitem.id === prod.id
    );
    //If we have only one itemcount for particular product and action is remove then we have to delete whole product from cart page since new item count will be zero

    //else we can increase or decrease item count
  if (updatedInfo[0].cartitem.itemCount >= 1) {
      const updatedItemCount =updatedInfo[0].cartitem.itemCount + 1
        dispatch(
        startUpdateItemsFromCart(
          updatedInfo[0].cartitem.cartitemId,
          updatedItemCount,
          "add"
        )
      );
    }
  else if (updatedInfo[0].cartitem.itemCount === 0) {
    const cartInfo = {
      currentUserInfo,
      prod,
      itemCount: 1,
    };
    dispatch(startAddItemsToCart(cartInfo));
    }
  };


  return (
    <Layout loading={isLoading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.title}</b>
                </p>
                <div className="d-flex">
                  <img
                    src={product.image}
                    alt="product"
                    style={{ height: `70vh` }}
                  />
                  <p
                    style={{
                      margin: `9rem 0 0 1rem`,
                      fontSize: 20,
                      fontWeight: `bold`,
                    }}
                  >
                    Price: {product.price} Rs/-
                  </p>
                </div>
                <hr />
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: `bold`,
                  }}
                >
                  {product.description}
                </p>
                <div className="d-flex justify-content-end ml-3">
                  <button
                    className="button my-3"
                    onClick={() =>handleUpdateCartItem(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
