import { useEffect, useState } from 'react';
import './receipts.css';
import Popup from '../components/popup';
import { ambrosialAxiosAPI } from '../../api/api';
import UpdateAndDeleteButton from '../components/common-components/update-and-delete-button';
import ConfirmationPopupContents from '../components/common-components/confirmation-popup-contents';
import ViewOrderItemsButton from '../components/orders-components/view-order-items-button';
import ViewReceiptItems from '../components/orders-components/view-receipt-items';

export default function Receipt(props) {

    //Create Receipt
    //Submit popup and confirmation popup
    const [createReceiptPopupOpen, setCreateReceiptPopupOpen] = useState(false);
    const [createReceiptConfirmationPopupOpen, setCreateReceiptConfirmationPopupOpen] = useState(false);

    function togglePopupCreateReceipt() {
        setCreateReceiptPopupOpen(!createReceiptPopupOpen);
        setSubmitStatusMessageStatus(false);
    }

    //State to see empty string and status message
    const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
    const [submitStatusMessage, setSubmitStatusMessage] = useState('');

    function onSubmitValidateInput(event){
        event.preventDefault();
        if(!orderNoIdValue || !totalItemPriceValue) {
            console.log('invalid orderNoIdValue is', orderNoIdValue);
            console.log('invalid totalItemPriceValue', totalItemPriceValue);
            setSubmitStatusMessageStatus(true);
            setSubmitStatusMessage('***Please check the input fields***');
            return;
        }else{
            console.log('In here');
            console.log('orderNoIdValue is', orderNoIdValue);
            console.log('totalItemPriceValue', totalItemPriceValue);
        }

        togglePopupCreateReceiptConfirmation();
    }

    function togglePopupCreateReceiptConfirmation() {
        setCreateReceiptConfirmationPopupOpen(!createReceiptConfirmationPopupOpen);
        togglePopupCreateReceipt();
        
        setSubmitStatusMessageStatus(false);
        setSubmitStatusMessage('');
    }

    function closePopupCreateReceiptConfirmation(){
        resetInputsToDefaultValue();
        togglePopupCreateReceiptConfirmation();
    }

    function resetInputsToDefaultValue(){
        setOrderNoIdValue(0);
        setTotalItemPriceValue(0);

        setSubmitStatusMessageStatus(false);
        setSubmitStatusMessage('');
        setPostStatus(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
    }

    function handleClosePopups(){
        setCreateReceiptPopupOpen(false);
        setCreateReceiptConfirmationPopupOpen(false);
        setOrderNoIdValue('');
        setTotalItemPriceValue('');
        setPostStatus(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
    }

    //For the inputs to create receipt
    const [orderNoIdValue, setOrderNoIdValue] = useState(0);
    const [totalItemPriceValue, setTotalItemPriceValue] = useState(0);

    //For the result of the post
    const [postStatus, setPostStatus] = useState(false);
    const [postStatusMessage, setPostStatusMessage] = useState(false);
    //For showing the result message
    const [postDataClicked, setPostDataClicked] = useState(false);
    
    async function createReceipt(){
        console.log('called create receipt');
        
        await ambrosialAxiosAPI.post('/createreceipt', {
            orderNoId:orderNoIdValue,
            totalItemPrice:totalItemPriceValue,
        })
        .then((response) => {
             console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
             console.log(`response Status: ${response.data.status}`);
             console.log(`response Message: ${response.data.message}`);
             console.log("response Data: ", response.data.data);
             setPostStatus(response.data.status);
             setPostStatusMessage(response.data.message);
          })
        .catch((error) => {
            console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            setPostStatus(error.response.data.status);
            setPostStatusMessage(error.response.data.message);
          });
          setPostDataClicked(true);
    }





    //update///////////////////////////////////////////////////////////////////////////
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);
    
    //setting of receiptID for each row
    const [receiptID, setReceiptID] = useState(false);
    //setting of orderNo for each row
    const [orderNo, setOrderNo] = useState(0);

    //***********To take out *********/
    console.log("receiptID is ", receiptID);


    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //function to toggle the popup update
    function toggleUpdateReceiptsPopup(){
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tags for update
    function onSubmitValidateinputForUpdate(event){
        event.preventDefault();
        console.log('orderNoIdValueUpdate is',orderNoIdValueUpdate);
        console.log('totalItemPriceValueUpdate is', totalItemPriceValueUpdate);
        if(!orderNoIdValueUpdate || !totalItemPriceValueUpdate){
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            console.log('in validating inputs for update receipts');
            return;
        }else{
            console.log('Currently still can submit');
        }

        toggleUpdateReceiptsConfirmation();
    }

    function toggleUpdateReceiptsConfirmation() {
        console.log('in toggle here');
        setViewUpdate(!viewUpdate);
        setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
        toggleUpdateReceiptsPopup();
        setUpdateSubmitStatus(false);
    }

    function closePopupUpdateReceiptConfirmation(){
        setOrderNoIdValueUpdate(0);
        setTotalItemPriceValueUpdate(0);

        setUpdateDataClicked(false);
        setUpdateReceiptStatus(false);
        setUpdateReceiptsStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(true);
        setViewConfirmationUpdatePopupOpen(false);
        console.log('in here');
    }

    //final close
    function handleCloseUpdatePopups(){
        setOrderNoIdValueUpdate(0);
        setTotalItemPriceValueUpdate(0);


        setUpdateDataClicked(false);
        setUpdateReceiptStatus(false);
        setUpdateReceiptsStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(false);
        setViewConfirmationUpdatePopupOpen(false);
    }

    //For the inputs to update order
    const [orderNoIdValueUpdate, setOrderNoIdValueUpdate] = useState(0);
    const [totalItemPriceValueUpdate, setTotalItemPriceValueUpdate] = useState(0);

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the update
    const [updateReceiptStatus, setUpdateReceiptStatus] = useState(false);
    const [updateReceiptsStatusMessage, setUpdateReceiptsStatusMessage] = useState(false);
    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);

    async function updateReceipts(){
        console.log('called update receipts');

        await ambrosialAxiosAPI.put(`/updatereceipt/${receiptID}`, {    
            orderNoId:orderNoIdValueUpdate,
            totalPrice:totalItemPriceValueUpdate,
        })
        .then((response) => {
            console.log(`${response.config.method} method for route: ${response.config.url}`);
            console.log(`response Status: ${response.data.status}`);
            console.log(`response Message: ${response.data.message}`);
            console.log("response Data: ", response.data.data);
            setUpdateReceiptStatus(response.data.status);
            setUpdateReceiptsStatusMessage(response.data.message);
        })
        .catch((error) => {
            console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            setUpdateReceiptStatus(error.response.data.status);
            setUpdateReceiptsStatusMessage(error.response.data.message);
        });

        setUpdateDataClicked(true);
    }
    /////////////////////////////////////////////////////////////////////////////


    //Delete Receipt
    //setting delete view, setting of the delete confirmation view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

    //States for validating the input tag
    const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
    const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

    //function to toggle the popup update
    function toggleDeleteReceiptPopup(){
        setViewDelete(!viewDelete);
        setDeleteSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for update
    function onSubmitValidateinputForDelete(){
        toggleDeleteReceiptConfirmation();
    }

    function toggleDeleteReceiptConfirmation() {
        console.log('in toggleDeleteReceiptConfirmation');
        setViewDelete(!viewDelete);
        setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
        toggleDeleteReceiptPopup();
        setDeleteSubmitStatus(false);
        
    }

    function closePopupDeleteReceiptConfirmation(){
        setDeleteDataClicked(false);
        setDeleteReceiptStatus(false);
        setDeleteReceiptStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(true);
        setViewConfirmationDeletePopupOpen(false);
        console.log('In closePopupDeleteReceiptConfirmation');
    }

    //final close
    function handleCloseDeletePopups(){
        setDeleteDataClicked(false);
        setDeleteReceiptStatus(false);
        setDeleteReceiptStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(false);
        setViewConfirmationDeletePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [deleteOrderItemStatus, setDeleteReceiptStatus] = useState(false);
    const [deleteOrderItemStatusMessage, setDeleteReceiptStatusMessage] = useState(false);
    //For showing the result message
    const [deleteDataClicked, setDeleteDataClicked] = useState(false);

    async function deleteReceipt(){
        console.log('called delete order item');


        await ambrosialAxiosAPI.delete(`/deletereceipt/${receiptID}`)
        .then((response) => {
            console.log(`${response.config.method} method for route: ${response.config.url}`);
            console.log(`response Status: ${response.data.status}`);
            console.log(`response Message: ${response.data.message}`);
            console.log("response Data: ", response.data.data);
            setDeleteReceiptStatus(response.data.status);
            setDeleteReceiptStatusMessage(response.data.message);
        })
        .catch((error) => {
            console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            setDeleteReceiptStatus(error.response.data.status);
            setDeleteReceiptStatusMessage(error.response.data.message);
        });

        setDeleteDataClicked(true);
    }
    /////////////////////////////////////////////////////////////////////////////






    //View Receipts
    useEffect(() => {
        getReceipts();
    }, []);

    //To get all receipts data
    const [receiptsListData, setReceiptsListData] = useState([]);
    
    const getReceipts = async() => {
        await ambrosialAxiosAPI.get('/receipts')
        .then((response) => {
             console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
             console.log(`response Status: ${response.data.status}`);
             console.log(`response Message: ${response.data.message}`);
             console.log("response Data: ", response.data.data);
             setReceiptsListData(response.data.data);
           })
        .catch((error) => {
           console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
           console.log(`Error Status: ${error.response.data.status}`);
           console.log(`Error Message: ${error.response.data.message}`);
         });
    }



    //This is for setting the viewing of the receipt popup
    const [viewReceipt, setViewReceipt] = useState(false);


    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log('modalVisible in receipts is', modalVisible);
    
    useEffect( async () => {

        if((createReceiptPopupOpen===true)){
            setModalVisible(true);
        }

        if((createReceiptConfirmationPopupOpen === true) ){
            setModalVisible(true);
        }

        if((viewUpdate===true)){
            setModalVisible(true);
        }

        if((viewConfirmationUpdatePopupOpen === true) ){
            setModalVisible(true);
        }

        if((viewDelete===true)){
            setModalVisible(true);
        }

        if((viewConfirmationDeletePopupOpen === true) ){
            setModalVisible(true);
        }

        if((createReceiptPopupOpen===false) && (createReceiptConfirmationPopupOpen===false) && (viewUpdate===false) && (viewConfirmationUpdatePopupOpen===false) && (viewDelete===false) && (viewConfirmationDeletePopupOpen===false)){
            setModalVisible(false);
        }else{
            console.log('not all popup states are false');
        }
        
    }, [createReceiptPopupOpen, createReceiptConfirmationPopupOpen, viewUpdate, viewConfirmationUpdatePopupOpen, viewDelete, viewConfirmationDeletePopupOpen]);




    return (
        <>
        <div className='createAndRefresh'>
            <button  className='refreshList' onClick={getReceipts}>Refresh List</button>
            <button className='createReceipt' onClick={togglePopupCreateReceipt}>Create Receipt</button> 
        </div>
            



            {modalVisible ? <div className='modal-one'></div>:null}
            {createReceiptPopupOpen && <Popup
            popupType='createReceiptPopup'
            handleClose={togglePopupCreateReceipt}
            content={
                <form className='formCreateReceipt' onSubmit={onSubmitValidateInput}>
                    <label className='formHeaderCreateReceipt'>Create Receipt</label>
                    <br /><br />

                    <div className='label-input-div'>
                        <label className='formLabelTextReceiptOrderId'>Order No. Id</label>
                        <input type="number" className='createInputOrderId' onChange={(e) => setOrderNoIdValue(e.target.value)}></input>
                    </div>
                    <br /><br />

                    <div className='label-input-div'>
                        <label className='formLabelTextReceiptTotalItemPrice'>Total Item Price</label>
                        <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValue(e.target.value)} ></input>
                    </div>
                    <br /><br />

                    <button className='createReceiptButton'>Submit</button>
                    <br /><br />

                    {submitStatusMessageStatus ? <label className='formLabelTextStatusCreate'>{<label className='formLabelText'>{submitStatusMessage}</label>}</label>:null}
                </form>
            }/>}

            {createReceiptConfirmationPopupOpen && <Popup
            popupType='createReceiptConfirmationPopup'
            handleClose={closePopupCreateReceiptConfirmation}
            content={
                <ConfirmationPopupContents invokeAction={createReceipt} invokeRefresh={getReceipts} xButtonClose={closePopupCreateReceiptConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage}/>
            }/>}  


            
            {/* update Popup */}
            {viewUpdate && <Popup
                popupType='updateReceiptPopup'
                handleClose={toggleUpdateReceiptsPopup}
                content={
                    <form className='formUpdateReceipt' onSubmit={onSubmitValidateinputForUpdate}>
                        <label className='formHeaderUpdateReceipt'>Update Receipt</label>
                            <br></br>
                            <br></br>

                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateReceiptId'>Order No. Id</label>
                                <input type="number" className='updateInputOrderNoId' value={orderNoIdValueUpdate} disabled></input>
                            </div>
                            <br></br>

                            
                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateReceiptTotalItemPrice'>Total Item Price</label>
                                <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValueUpdate(e.target.value)} ></input>
                            </div>
                            <br></br>

                            <button className='updateReceiptButton'>Submit</button>
                            <br></br>
                            <br></br>

                        {updateSubmitStatus ? <label className='formLabelTextStatusUpdate'>{<label className='formLabelText'>{updateSubmitStatusMessage}</label>}</label>:null}
                    </form>
            }/>}

            { viewConfirmationUpdatePopupOpen && <Popup
            popupType='updateReceiptConfirmationPopup'
            handleClose={closePopupUpdateReceiptConfirmation}
            content={
                //props needed are: updateReceipts(), closePopupUpdateReceiptConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateReceiptsStatusMessage
                <ConfirmationPopupContents  invokeAction={updateReceipts} invokeRefresh={getReceipts} xButtonClose={closePopupUpdateReceiptConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateReceiptsStatusMessage}/>
            }/>}

            
            {/* delete Popup */}
            {viewDelete && <Popup
                popupType='deleteReceiptPopup'
                handleClose={toggleDeleteReceiptPopup}
                content={
                    <form className='formDeleteReceipt' onSubmit={onSubmitValidateinputForDelete}>
                        <label className='formHeaderDeleteReceipt'>Delete Receipt</label>
                        <br></br>
                        <br></br>

                        <label className='formLabelTextDeleteOrderNo'>Order No.  </label>
                        <label className='formLabelOrderNoInDelete'>{orderNo}</label>
                        <br></br>

                        <button className='deleteReceiptButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {deleteSubmitStatus ? <label className='formLabelTextStatusDelete'>{<label className='formLabelText'>{deleteSubmitStatusMessage}</label>}</label>:null}
                    </form>
                }/>}

            {viewConfirmationDeletePopupOpen && <Popup
            popupType='deleteReceiptConfirmationPopup'
            handleClose={toggleDeleteReceiptConfirmation}
            content={
                <ConfirmationPopupContents  invokeAction={deleteReceipt} invokeRefresh={getReceipts} xButtonClose={closePopupDeleteReceiptConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteOrderItemStatusMessage}/>
            }/>
            } 


            <div className="receipt">
                <h1 className='receipt-title'>Receipts</h1>
                <table className='receipt-table'>
                    <tr>
                        <th className='receipt-table-column'>No.</th>
                        <th className='receipt-table-column'>Order No. Id</th>
                        <th className='receipt-table-column'>Order No.</th>
                        <th className='receipt-table-column'>Receipt Id.</th>
                        <th className='receipt-table-column' colSpan='3'>Actions</th>
                    </tr>
                    
                    {receiptsListData.map((receiptsList, index)=>(
                            <tr key={receiptsList.orderNoId}>
                            <td className='receipt-table-column'>{index+1}</td>
                            <td className='receipt-table-column'>{receiptsList.orderNoId}</td>
                            <td className='receipt-table-column'>{receiptsList.DistinctOrderList.orderNo}</td>
                            <td className='receipt-table-column'>{receiptsList.receiptID}</td>
                            <td className='actionButtons'><ViewOrderItemsButton orderNoId={() => {}} setOrderNoId={() => {}} setOrderNo={setOrderNo} orderNo={receiptsList.DistinctOrderList.orderNo} setViewOrder={setViewReceipt}/></td>
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setReceiptID} id={receiptsList.receiptID} setData={setOrderNoIdValueUpdate} data={receiptsList.orderNoId} setView={setViewUpdate} buttonText={"Update Receipt"}/></td>
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setReceiptID} id={receiptsList.receiptID} setData={setOrderNo} data={receiptsList.DistinctOrderList.orderNo} setView={setViewDelete} buttonText={"Delete Receipt"}/></td>
                            </tr>
                        )
                    )}
                </table>

                <ViewReceiptItems setViewOrder={setViewReceipt} viewOrder={viewReceipt} orderNo={orderNo}/>
            </div>
        </>
    )
}
