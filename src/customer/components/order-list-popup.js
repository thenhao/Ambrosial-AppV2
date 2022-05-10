import React from 'react'
import Invoice from './invoice.js'
import './order-list-popup.css';

function OrderListPopUp(props) {
    console.log('Inside Order List Popup, id for invoice:', props.id)
    console.log('Inside Order List Popup:', props.selectedItemList);
    return (props.trigger) ?  (
        <div className="orderlist-popup">
            <div className="popup-page">
                {props.children}

                <h1 className="popupTitle">Your Order Has Been Sent!</h1>
                <Invoice className="invoice"/>
            </div>
        </div>
    ) : null; 
}

export default OrderListPopUp;
