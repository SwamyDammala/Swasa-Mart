import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import OrdersHistory from "./OrdersHistory";
import Modal from "../components/Modal/modal";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Tabs, Tab } from "react-bootstrap";
import "./styles/admin.css";
const Admin = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //State variable for checkout modal window
  const [checkOutModal, setCheckOutModal] = useState(undefined);

  //State variable for toggle the same modal form between Add and Edit Product
  const [addformToggle, setAddFormToggle] = useState(false);

  //Form State data variables for Check Out Address
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
    rating: {
      count: "",
      rate: "",
    },
  });

  useEffect(() => {
    getProducts();
  }, []);

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

  //To toggle the Modal pop up
  const handleModal = () => {
    setCheckOutModal(undefined);
  };

  //TO PopUp Modal for Edit
  const editProductModal = (currentProduct) => {
    //To Open the model by making checkoutmodel state variable as true
    setCheckOutModal(true);
    //To keep the values of exiting product values in form
    setProduct(currentProduct);
    setAddFormToggle(false);
  };

  const updateProduct = async () => {
    try {
      setIsLoading(true);
      await updateDoc(doc(db, "products", product.id), product);
      handleModal();
      toast.success("Product Updated Successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product Update failed");
      console.log(error);
      setIsLoading(false);
    }
  };

  //To PopUp Modal for addProduct

  const addProductModal = () => {
    //To Open the model by making checkoutmodel state variable as true
    setCheckOutModal(true);
    setAddFormToggle(true);
    setProduct({});
  };

  const addProduct = async () => {
    try {
      setIsLoading(true);
      await addDoc(collection(db, "products"), product);
      handleModal();
      toast.success("Product added Successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product add failed");
      console.log(error);
      setIsLoading(false);
    }
  };

  //remove product

  const removeProduct = async (product) => {
    try {
      await deleteDoc(doc(db, "products", product.id));
      toast.success("Product deleted successfully");
      getProducts();
    } catch (error) {
      toast.error("Product delete failed");
      console.log(error);
    }
  };

  //Dynamic header content for Modal
  const headerContent = () => {
    return (
      <>
        <h3>{addformToggle ? "Add Product" : "Edit Product"}</h3>
        <hr />
      </>
    );
  };

  //Dynamic body content for Modal
  const bodyContent = () => {
    return (
      <>
        <input
          type="text"
          name="title"
          value={product.title ? product.title : ""}
          placeholder="Product Title"
          className="form-control"
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <input
          type="text"
          name="category"
          value={product.category ? product.category : ""}
          placeholder="Product Category"
          className="form-control"
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <input
          type="number"
          name="price"
          value={product.price ? product.price : ""}
          placeholder="Product Price in Rs/-"
          className="form-control"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="text"
          name="description"
          value={product.description ? product.description : ""}
          placeholder="Product Description"
          className="form-control"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <input
          type="text"
          name="img"
          value={product.image ? product.image : ""}
          placeholder="Product Image Url"
          className="form-control"
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <input
          type="number"
          name="count"
          value={product.rating ? product.rating.count : ""}
          placeholder="Product Rating count"
          className="form-control"
          onChange={(e) =>
            setProduct({
              ...product,
              rating: { ...product.rating, count: e.target.value },
            })
          }
        />
        <input
          type="number"
          name="rate"
          value={product.rating ? product.rating.rate : ""}
          placeholder="Product rating"
          className="form-control"
          onChange={(e) =>
            setProduct({
              ...product,
              rating: { ...product.rating, rate: e.target.value },
            })
          }
        />
      </>
    );
  };

  return (
    <div>
      <Layout loading={isLoading}>
        <Tabs
          defaultActiveKey="products"
          id="uncontrolled-tab-example"
          className="mb-3 mt-2"
        >
          <Tab eventKey="products" title="Products">
            <div className="d-flex justify-content-between">
              <h1 className="p-1">Products</h1>
              <button style={{ height: `42px` }} onClick={addProductModal}>
                Add Product
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((prod) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={prod.image}
                            alt="prodImage"
                            className="prodImg"
                          />
                        </td>
                        <td>
                          <strong>{prod.title}</strong>
                        </td>
                        <td>
                          <strong>{prod.price}</strong>
                        </td>
                        <td>
                          <strong>{prod.category}</strong>
                        </td>
                        <td>
                          <FaTrash
                            color="red"
                            onClick={() => removeProduct(prod)}
                          />
                          <FaEdit
                            color="blue"
                            onClick={() => editProductModal(prod)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="orders" title="Orders">
            <OrdersHistory class='mt-0'/>
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Contact
          </Tab>
        </Tabs>

        <Modal
          checkOutModal={checkOutModal}
          handleCancel={handleModal}
          headerContent={headerContent}
          bodyContent={bodyContent}
          handleConfirm={addformToggle ? addProduct : updateProduct}
          isLoading={isLoading}
          confirmBtn="Update Product"
        />
      </Layout>
    </div>
  );
};

export default Admin;
