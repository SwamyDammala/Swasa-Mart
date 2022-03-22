import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import './styles/OrdersHistory.css'

const OrdersHistory=(props)=> {
  const [isLoading, setIsLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [totalOrders,setTotalOrders]=useState(0)

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("loginUser")).uid;
      const currentUserOrdersData = await getDocs(collection(db, "orders"));
      setIsLoading(false);
      const ordersArr = [];
      currentUserOrdersData.forEach((order) => {
        if (order.data().userId === userId) {
          order.data().cartItems.forEach((orderedItem) => {
            ordersArr.push(orderedItem);
          });
        }
      });
      setOrdersData(ordersArr);
      setIsLoading(false);
      setTotalOrders(ordersArr.length)
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className={props.class ? props.class : "mt-2"}>
      <h3>You have ordered total of <strong style={{color:'green'}}>{totalOrders}</strong> orders so far.</h3>
      <Layout loading={isLoading}>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {ordersData &&
              ordersData.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>
                      <img
                        src={order.image}
                        alt="prodImage"
                        className="prodImg"
                      />
                    </td>
                    <td>
                      <strong>{order.title}</strong>
                    </td>
                    <td>
                      <strong>{order.price}</strong>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}


export default OrdersHistory