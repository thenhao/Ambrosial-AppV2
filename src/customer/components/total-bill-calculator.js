import React from "react";
import './total-bill-calculator.css';

function TotalBillCalculator(props) {
  let totalBill = 0;
  for (const element of props.selectedItemList) {
    totalBill = (totalBill + element.price * element.quantity) * 1.07;
  }
  let finalBill = Math.round(totalBill * 100) / 100;
  
  console.log(props);
  props.handleTotalBill(finalBill);

  // if-else statement to show total bill when cart is filled and disappears when cart is empty

  if (props.selectedItemList.length === 0) {
    return null;
  }
  else {
    return <p className='total-bill'>Total Bill (inclusive of 7% GST) : ${finalBill.toFixed(2)}</p>;
  } 
}

export default TotalBillCalculator;
