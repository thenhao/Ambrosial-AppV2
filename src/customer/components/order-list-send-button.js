import { useState } from 'react';
import './order-list-send-button.css';
import emailjs from '@emailjs/browser';
import OrderListPopUp from './order-list-popup' ;

function OrderListSendButton ({selectedItemList, setTotalBilling, TotalBilling}) {
  const [buttonPopup, setButtonPopup] = useState(false);
  
     function createEmailItems() {
      let htmlString = `<table width="500" cellspacing="2" border="1"><tr><th>Item</th><th>Quantity</th><th>Price</th></tr><tfoot><tr><td colspan="2">Total Bill (inclusive of 7% GST): </td><td colspan="1" align="right">$ ${TotalBilling}</td></tr></tfoot>`;

      //Generate Dynamic Data
      selectedItemList.map(element => {
        return(
        htmlString += `<tr><td>${element.name}</td><td align="center">${element.quantity}</td><td align="right">$ ${(element.price*element.quantity).toFixed(2)}</td></tr>`
      )})
      htmlString += '</table>';

      return htmlString;
  }
//To link dynamic table format to Emailjs requirement 
  const emailParams = {
        'html_element': createEmailItems()
  }
  const sendEmail = () => {
    emailjs.send('service_fi5x0b7', 'template_54i6s6w', emailParams, 'user_ZPUjQNampuN5LvHgZar8N')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  
  function onSendOrderButtonClick() {
    // 1. Send Email with confirmed props.
    // For improvement of inserting invoice : setinvoicenum(generateInvoiceId);

    console.log('I need to send email here');
    sendEmail();
    // 2. setButtonPopup to true
    setButtonPopup(true)
  }
  //if-else statement to show button when cart is filled and disappear when cart is empty
  if(selectedItemList.length === 0) {
    return null;
  }
  else {
    console.log('Inside Send Button:', selectedItemList);
    return (
      <>
        <div className="sendbtn-container">
          <button id='sendorderbtn' onClick={() => onSendOrderButtonClick()}>Send Order</button>
        </div>

        <OrderListPopUp trigger={buttonPopup} setTrigger={setButtonPopup} selectedItemList={selectedItemList} TotalBilling={TotalBilling}/>
      </>
      // For improvement of inserting invoice : id={invoicenum}
    )
  }  
}
export default OrderListSendButton;