import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import ProductInfo from "./ProductInfo";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../redux/actions/actions";
import { useSelector } from "react-redux";
import "./styles/productstyle.css";

const HomePage = () => {
  //Initializing an empty state array for products
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchProduct, setSearchProduct] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => ({
    cartItems: state.cartReducer.cartItems,
  }));

  //We are getting the products for the first time component loaded
  useEffect(() => {
    getProducts();
  }, []);

  //To update the local Store to based on everytime cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //getting products from firebase
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const productsData = await getDocs(collection(db, "products"));
      const productsArr = [];
      productsData.forEach((product) => {
        productsArr.push({
          id: product.id,
          ...product.data(),
        });
      });
      setProducts(productsArr);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //To get the product Id for each product
  const getProductId = (prodId) => {
    setProductId(prodId);
  };

  //handle change method for search key words

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "searchProduct") {
      setSearchProduct(value);
    } else if (name === "filterByCategory") {
      setFilterByCategory(value);
    }
  };

  //To get the array of all unique category of all products to show in dropdown
  const allProductsCatergories = products.length > 0 && [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <Layout loading={isLoading}>
      <div className="container mt-100">
        <div className="d-flex w-50">
          <input
            type="text"
            name="searchProduct"
            className="form-control mx-4"
            placeholder="search Product..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <select
            className="form-control"
            name="filterByCategory"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="">Filter By Catergory</option>
            {allProductsCatergories.length > 0 &&
              allProductsCatergories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="row">
          {products.length > 0 &&
            products
              .filter(
                (product) =>
                  product.title
                    .toLowerCase()
                    .includes(searchProduct.toLowerCase()) &&
                  (product.category === filterByCategory ||
                    filterByCategory === "")
              )
              .map((product) => {
                return (
                  <div className="col-sm-4" key={product.id}>
                    <div className="m-2 p-1 product position-relative">
                      <div className="product-content">
                        <p>{product.title.substring(0, 55)}</p>
                        <img
                          className="product-img"
                          src={product.image}
                          alt="product"
                        />
                      </div>
                      <div className="product-actions">
                        <h2>
                          {product.price} <small>RS/-</small>
                        </h2>
                        <div className="d-flex">
                          <button
                            onClick={() => dispatch(addItemsToCart(product))}
                            className="button mx-2 mb-1"
                          >
                            Add To Cart
                          </button>
                          <button
                            className="button mb-1"
                            onClick={() => getProductId(product.id)}
                          >
                            <Link to={`/productInfo/${product.id}`}>View</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <ProductInfo prodId={productId} />
    </Layout>
  );
};

export default HomePage;
