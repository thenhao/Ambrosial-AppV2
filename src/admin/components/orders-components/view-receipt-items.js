import './view-receipt-items.css'
import Popup from '../popup';
import capitalize from 'capitalize-the-first-letter';
import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../../api/api';


function ViewReceiptItems(props){

    //To show or hide the view orders
    function toggleViewReceiptOrderPopup(){
        props.setViewOrder(false);
        setOrderedItemsForReceiptData([]);
        setTotalReceiptPrice('');
        setOrderedItemsForReceiptDataStatus(false);
    }

/////////////////////////////////////////////////////////////////////////////
    //order data status and ordereditems data
    const [orderedItemsForReceiptDataStatus, setOrderedItemsForReceiptDataStatus] = useState(false);
    const [orderedItemsForReceiptData, setOrderedItemsForReceiptData] = useState([]);
    //api code to call orders table and get the value
    async function getAllOrderedItemsForReceipt(){
        await ambrosialAxiosAPI.get(`/vieworderitems/${props.orderNo}`)
        .then((response) => {
        console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
        console.log(`response Status: ${response.data.status}`);
        console.log(`response Message: ${response.data.message}`);
        console.log("response Data: ", response.data.data);
        setOrderedItemsForReceiptData(response.data.data);
        setOrderedItemsForReceiptDataStatus(true);
        })
        .catch((error) => {
        console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
        });
    }

    //Use effect to handle the polling of the data
    useEffect(async () => {    
        if(props.viewOrder === true){
            
            getAllOrderedItemsForReceipt();
        }else{
            setOrderedItemsForReceiptData([]); 
        }
    }, [props.viewOrder]);
    

    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    //UseEffect to handle the showing of the modal
    useEffect(async () => {

        if((props.viewOrder===true)){
            setModalVisible(true);
        }

        if((props.viewOrder===false)){
            setModalVisible(false);
        }
        
    }, [props.viewOrder]);

    //To get total price for all items calculation function and state
    const [totalReceiptPrice, setTotalReceiptPrice] = useState(0);

    function getTotalPrice(orderedItemsForReceiptData){
         let total = 0;
         orderedItemsForReceiptData.forEach((item)=>{
                let price = Number(item.MenuItem.price);
                let quantity = item.quantity;
                let currentItemPrice = quantity * price;
                total = total + currentItemPrice;    
         });

        let formatTotal = parseFloat(total).toFixed(2); 
        
        setTotalReceiptPrice(formatTotal);
    }

    useEffect(async () => {

        if((orderedItemsForReceiptDataStatus===true)){
            
            getTotalPrice(orderedItemsForReceiptData);
        }
        
    }, [orderedItemsForReceiptDataStatus]);

    return(
        <>
            {modalVisible ? <div className='modalViewReceiptOrdersContainer'></div>:null}
            {props.viewOrder && <Popup
            popupType='viewReceiptsItemsPopup'
            handleClose={toggleViewReceiptOrderPopup}
            content={
                <div>
                    <table className='viewReceiptItemsTable'>
                    
                    <tr>
                        <td className='viewReceiptItemsOrderNo'><b>Order No.:</b></td>
                        <td><b>{props.orderNo}</b></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <br></br>  
                    <br></br>  

                    <tr>
                        <th className='viewReceiptItemsTableColumn'>No.</th>
                        <th className='viewReceiptItemsTableColumn'>Item</th>
                        <th className='viewReceiptItemsTableColumn'>Quantity</th>
                        <th className='viewReceiptItemsTableColumn'>Item Price</th>
                    </tr>
                    
                    <br></br>  

                    {orderedItemsForReceiptData ? orderedItemsForReceiptData?.map((orderedItemsForReceiptData, index)=>(
                            <tr key={orderedItemsForReceiptData.orderNo}>
                                <td>{index+1}</td>
                                <td>{capitalize(orderedItemsForReceiptData.MenuItem.alt)}</td>
                                <td>{orderedItemsForReceiptData.quantity}</td>
                                {/* <td>{orderedItemsForReceiptData.MenuItem.price}</td>  */}
                                <td>{(orderedItemsForReceiptData.MenuItem.price*orderedItemsForReceiptData.quantity).toFixed(2)}</td>
                            </tr>
                        )
                    ): <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>}
                
                <br></br> 
                <tr>
                    <td></td>
                    <td></td>
                    <td>Total Price:</td>
                    {orderedItemsForReceiptDataStatus ? <td>{totalReceiptPrice}</td> : <td>-</td>}
                </tr>
                
                <tr>
                    <td colspan="4"><button className='closeViewReceiptButton' onClick={toggleViewReceiptOrderPopup}>Close</button></td>
                </tr>

                </table>
                    
            </div>
                
            }/>} 
        </>
    )
}

export default ViewReceiptItems;