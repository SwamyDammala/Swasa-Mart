/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import { collection, addDoc, deleteDoc } from "firebase/firestore/lite";
import Loader from "./Loader/Loader";
// import { db } from "../firebase/firebase";
// import { doc } from "firebase/firestore/lite";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
    // addProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const newData = await data.json();
      console.log("finalData", newData);
      setProducts(newData);
      // newData &&
      //   newData.map(async (prod) => {
      //     await addDoc(collection(db, "products"), {
      //       category: prod.category,
      //       description: prod.description,
      //       image: prod.image,
      //       price: prod.price,
      //       rating: {
      //         count: prod.rating.count,
      //         rate: prod.rating.rate,
      //       },
      //       title: prod.title,
      //     });
      //   });
      setLoading(false);
      console.log(products.length)
    } catch (error) {
      console.log(error);
    }
  };

  //   const addProducts = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   };

  return (
    <>
      {loading && <Loader />}
      {/* <button onClick={addProducts}>Add Products</button> */}
      {/* {products &&
        products.map((prod) => {
          return <img key={prod.id} src={prod.image} />;
        })} */}
    </>
  );
};

export default Products;
