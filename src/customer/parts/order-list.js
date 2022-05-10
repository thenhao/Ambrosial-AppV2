import React, { useState } from "react";

import Popup from '../components/popup/popup';
import CartItems from '../components/cart-items';
import TotalBillCalculator from '../components/total-bill-calculator';
import OrderListSendButton from '../components/order-list-send-button';
import OrderListPopUp from '../components/order-list-popup' ;
import "./order-list.css";

function OrderList(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sendOrderPopup, setSendOrderPopup] = useState(false);
  const [TotalBilling, setTotalBilling] = useState(0);
  
  const handleTotalBill = (bill) => {
    console.log('Inside handle total billing: ', bill);
    setTotalBilling(bill);
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const toggleSendOrderPopup = () => {
    setSendOrderPopup(!sendOrderPopup);
  }
  
  function updateQuantityHandler() {
    let totalQuantity = 0;
    for (let i = 0; i < props.selectedItemList.length; i++){
      totalQuantity += props.selectedItemList[i].quantity;
    }
    return totalQuantity;
  }

  return(
    <>
      <img src="https://i.ibb.co/tYKtTN0/image.jpg"
        alt="cart icon" 
        className="orderlisticon"
        style={{height: 55, width: 55}}
        onClick={togglePopup} />

      <div className="quantityUpdater">{updateQuantityHandler()}</div>
        
      {isOpen && <Popup 
      popupType='orderlist-popup' 
      handleClose={togglePopup}
      content={
        <>
          <CartItems selectedItemList={props.selectedItemList} setSelectedItemList={props.setSelectedItemList}/>
          <TotalBillCalculator selectedItemList={props.selectedItemList} handleTotalBill={handleTotalBill}/>              
          <OrderListSendButton selectedItemList={props.selectedItemList} TotalBilling={TotalBilling} setIsOpen={setIsOpen} setSendOrderPopup={setSendOrderPopup}/>
        </>
      }/>}

      {sendOrderPopup && <Popup 
        popupType='orderbill-popup' 
        handleClose={toggleSendOrderPopup}
        content={<OrderListPopUp setSendOrderPopup={setSendOrderPopup} TotalBilling={TotalBilling} selectedItemList={props.selectedItemList}/>}/>}
    </>);

}

export default OrderList;
