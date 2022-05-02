import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddItemsToCart,
  startUpdateItemsFromCart,
} from "../redux/actions/actions";
import "./styles/productstyle.css";

const HomePage = () => {
  //To get the cart items from redux store
  const { cartItems } = useSelector((state) => ({
    cartItems: state.cartReducer,
  }));

  //Initializing an empty state array for products
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Initiliazing state variables for search funtionality
  const [searchProduct, setSearchProduct] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");

  //Current Login user Session details
  const currentUserInfo = {
    email: JSON.parse(localStorage.getItem("loginUser")).email,
    userId: JSON.parse(localStorage.getItem("loginUser")).uid,
  };

  //Filter our curent user cart items from all cart items
  const currentUserCartItems = cartItems.filter(
    (item) => item.cartitem.userId === currentUserInfo.userId
  );

  const dispatch = useDispatch();

  //We are getting the products for the first time component loaded
  useEffect(() => {
    getProducts();
  }, []);

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

  //handle change method for search filter key words
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

  //Handle method for Adding cart items to database
  const updateItemsToCartMethod = (prod, updateState) => {
    //checking whether the product is already exisiting in cart or not and if exists then we increase or decrease the itemcount
    console.log("Checking from home page", prod)
    console.log(cartItems)
    console.log(currentUserCartItems)
    const updatedInfo = currentUserCartItems
      .filter((item) => item.cartitem.id === prod.id)
      // eslint-disable-next-line array-callback-return
      .map((item) => {
        if (updateState === "add") {
          return {
            cartItemId: item.cartitem.cartitemId,
            updatedItemCount:item.cartitem.itemCount+1
          };
        } 
      });
    console.log('Checking from home page',updatedInfo)
    //dispatching method for add or update cart Items based on item count
    //If above array length more than 1 then we will update or we will add as new cart item in else condition
    if (updatedInfo.length > 0) {
      dispatch(
        startUpdateItemsFromCart(
          updatedInfo[0].cartItemId,
          updatedInfo[0].updatedItemCount,
          updateState
        )
      );
    } else {
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
                            onClick={() =>
                              updateItemsToCartMethod(product, "add")
                            }
                            className="button mx-2 mb-1"
                          >
                            Add To Cart
                          </button>
                          <button className="button mb-1">
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
    </Layout>
  );
};

export default HomePage;
