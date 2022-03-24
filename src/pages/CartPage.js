import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { startRemoveItemsFromCart } from "../redux/actions/actions";
import Modal from "../components/Modal/modal";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./styles/cartpage.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  //To get the cart items from redux store
  const { cartItems } = useSelector((state) => ({
    cartItems: state.cartReducer,
  }));

  const { email } = JSON.parse(localStorage.getItem("loginUser"))
  const userId=JSON.parse(localStorage.getItem("loginUser")).uid

  const currentUserCartItems=cartItems.filter(cartitem=>cartitem.currentUserInfo.userId===userId)

  const [totalPrice, setTotalPrice] = useState(0);
  //State variable for checkout modal window
  const [checkOutModal, setCheckOutModal] = useState(undefined);
  const dispatch = useDispatch();

  //Form State data variables for Check Out Address
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPinCode] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Delete product from cart
  const removeProdFromCart = (id) => {
    dispatch(startRemoveItemsFromCart(id));
  };

  //to get the total price of all products in cart Page
  useEffect(() => {
    let tempPrice = 0;
    currentUserCartItems.forEach((product) => {
      tempPrice += product.prod.price;
    });
    setTotalPrice(tempPrice);
  }, [currentUserCartItems]);

  //To toggle the Modal pop up
  const handleModal = () => {
    setCheckOutModal(undefined);
  };

  //TO PopUp Modal
  const popUpModal = () => {
    setCheckOutModal(true);
  };

  //Handle Change for Address form Data
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "pincode") {
      setPinCode(value);
    } else if (name === "mobileNum") {
      setMobileNum(value);
    }
  };

  //Method for sending data while clicking on submit button
  const handlePlaceOrder = async () => {
    const deliveryAddress = { name, address, pincode, mobileNum };
    const orderInfo = {
      currentUserCartItems,
      email,
      userId,
      deliveryAddress,
    };
    if (orderInfo.deliveryAddress && orderInfo.currentUserCartItems) {
      try {
        setIsLoading(true);
        await addDoc(collection(db, "orders"), orderInfo)
        setIsLoading(false);
        //Removing cart items from cart after ordering the items
        currentUserCartItems.forEach((cartitem) => {
          removeProdFromCart(cartitem.id)
        })
        toast.success("Order Placed Succesfully");
        handleModal();
      } catch (error) {
        toast.error("Order failed");
        setIsLoading(false);
        handleModal();
        console.log(error)
      }
    }
  };

  //Dynamic header content for Modal
  const headerContent = () => {
    return (
      <>
        <h3> Check Out Item</h3>
        <hr />
        <h4>Address Details</h4>
      </>
    );
  };

  //Dynamic body content for Modal
  const bodyContent = () => {
    return (
      <>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control"
          onChange={(e) => handleChange(e)}
        />
        <textarea
          type="textarea"
          name="address"
          placeholder="Enter Address"
          className="form-control"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          name="pincode"
          placeholder="Enter Pincode"
          className="form-control"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          name="mobileNum"
          placeholder="Enter Mobile Number"
          className="form-control"
          onChange={(e) => handleChange(e)}
        />
      </>
    );
  };
  return (
    <Layout loading={isLoading}>
      {currentUserCartItems.length > 0 ?
        <>
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUserCartItems.map((product) => {
              return (
                <tr>
                  <td>
                    <Link to={`/productInfo/${product.prod.id}`}>
                    <img src={product.prod.image} alt="prodImage" className="prodImg" />
                  </Link>
                  </td>
                  <td>
                    <strong>{product.prod.title}</strong>
                  </td>
                  <td>
                    <strong>{product.prod.price}Rs/-</strong>
                  </td>
                  <td>
                    <FaTrash onClick={() => removeProdFromCart(product.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
       
      <div className="d-flex justify-content-end">
        <h1 className="total-price">
          Total Amount:<strong> {totalPrice}</strong> RS/-
        </h1>
      </div>
      <div className="d-flex justify-content-end mt-1">
        <Modal
          checkOutModal={checkOutModal}
          handleCancel={handleModal}
          headerContent={headerContent}
          bodyContent={bodyContent}
          handleConfirm={handlePlaceOrder}
          isLoading={isLoading}
          confirmBtn="Order Item"
        />
        <button onClick={popUpModal}>PLACE ORDER</button>
          </div>
        </>
         :<h3 className="mt-2">No Items in your Cart</h3>}
    </Layout>
  );
};

export default CartPage;
