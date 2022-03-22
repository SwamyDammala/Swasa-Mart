/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { useParams } from "react-router";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../redux/actions/actions";
import { db } from "../firebase/firebase";

const ProductInfo = (props) => {
  const param = useParams();
  console.log(param);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
                    onClick={() => dispatch(addItemsToCart(product))}
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
