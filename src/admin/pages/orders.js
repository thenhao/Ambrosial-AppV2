import { useEffect, useState } from 'react';
import './orders.css';
import Popup from '../components/popup';
import { ambrosialAxiosAPI } from '../../api/api';
import ViewOrderItems from '../components/orders-components/view-order-items';
import ViewOrderItemsButton from '../components/orders-components/view-order-items-button';
import UpdateAndDeleteButton from '../components/common-components/update-and-delete-button';
import ConfirmationPopupContents from '../components/common-components/confirmation-popup-contents';

export default function Orders() {

    //submit popup and confirmation popup
    const [createOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);
    const [confirmationOrderPopupOpen, setConfirmationOrderPopupOpen] = useState(false);

    function togglePopupCreateOrder() {
        setCreateOrderPopupOpen(!createOrderPopupOpen);
        setSubmitStatusMessageStatus(false);
        setModalVisible(!modalVisible);
    }

    //State to see empty string and status message
    const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
    const [submitStatusMessage, setSubmitStatusMessage] = useState('');

    //validation on submit
    function onSubmitValidateInput(event) {
        event.preventDefault();
        if (!orderNoValue) {
            setSubmitStatusMessageStatus(true);
            setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            return;
        }

        togglePopupCreateOrderConfirmation();
    }


    function togglePopupCreateOrderConfirmation() {

        setConfirmationOrderPopupOpen(!confirmationOrderPopupOpen);
        togglePopupCreateOrder();
        setSubmitStatusMessageStatus(false);
    }

    function closePopupCreateOrderConfirmation() {
        console.log('in closePopupCreateOrderConfirmation here');
        setOrderNoValue(0);

        setPostDataClicked(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
        setSubmitStatusMessageStatus(false);
        setCreateOrderPopupOpen(true);
        setConfirmationOrderPopupOpen(false);

    }

    //final close
    function handleClosePopups() {

        setOrderNoValue(0);

        setPostDataClicked(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
        setSubmitStatusMessageStatus(false);
        setCreateOrderPopupOpen(false);
        setConfirmationOrderPopupOpen(false);

    }

    //For the inputs to create order
    const [orderNoValue, setOrderNoValue] = useState(0);

    //For the result of the post
    const [postStatus, setPostStatus] = useState(false);
    const [postStatusMessage, setPostStatusMessage] = useState(false);
    //For showing the result message
    const [postDataClicked, setPostDataClicked] = useState(false);

    async function createDistinctOrder() {
        console.log('called create distinct order');

        await ambrosialAxiosAPI.post('/createdistinctorder', {
            orderNo: orderNoValue,
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
                console.log(`${error.response.config.method} method`, `for route:, ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setPostStatus(error.response.data.status);
                setPostStatusMessage(error.response.data.message);
            });


        setPostDataClicked(true);
    }

    useEffect(async () => {
        //preload the orders
        getAllDistinctOrders();

    }, []);

    //To get all distinct orders data
    const [distinctOrderData, setDistinctOrderData] = useState([]);

    async function getAllDistinctOrders() {
        await ambrosialAxiosAPI.get('/viewdistinctorder')
            .then((response) => {
                console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                //Not in template literal as it will only show the type object
                console.log("response Data: ", response.data.data);
                setDistinctOrderData(response.data.data);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method`, `for route:, ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
            });
    }

    //This is for viewing the orders for a distinct order
    const [viewOrderItemsOrderNo, setViewOrderItemsOrderNo] = useState(0);
    const [viewOrder, setViewOrder] = useState(false);


    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);

    //setting of orderNoId for each row
    const [orderNoId, setOrderNoId] = useState(false);
    const [orderNoUpdate, setOrderNoUpdate] = useState(0);

    console.log("orderNoId is ", orderNoId);
    console.log("orderNoUpdate is ", orderNoUpdate);

    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleUpdateDistinctOrderPopup() {
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for update
    function onSubmitValidateinputForUpdate(event) {
        event.preventDefault();
        if (!orderNoUpdate) {
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            return;
        }

        toggleUpdateDistinctOrderConfirmation();
    }

    function toggleUpdateDistinctOrderConfirmation() {

        console.log('in toggle here');
        setViewUpdate(!viewUpdate);
        setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
        toggleUpdateDistinctOrderPopup();
        setUpdateSubmitStatus(false);
    }

    function closePopupUpdateDistinctOrderConfirmation() {
        setOrderNoUpdate('');

        setUpdateDataClicked(false);
        setUpdateDistinctOrderStatus(false);
        setUpdateDistinctOrderStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(true);
        setViewConfirmationUpdatePopupOpen(false);
        console.log('in here');
    }

    //final close
    function handleCloseUpdatePopups(event) {
        setOrderNoUpdate('');

        setUpdateDataClicked(false);
        setUpdateDistinctOrderStatus(false);
        setUpdateDistinctOrderStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(false);
        setViewConfirmationUpdatePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [updateDistinctOrderStatus, setUpdateDistinctOrderStatus] = useState(false);
    const [updateDistinctOrderStatusMessage, setUpdateDistinctOrderStatusMessage] = useState(false);
    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);

    async function updateDistinctOrder() {
        console.log('called update order');


        await ambrosialAxiosAPI.put(`/updatedistinctorder/${orderNoId}`, {
            orderNoOld: viewOrderItemsOrderNo,
            orderNoNew: orderNoUpdate
        })
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setUpdateDistinctOrderStatus(response.data.status);
                setUpdateDistinctOrderStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setUpdateDistinctOrderStatus(error.response.data.status);
                setUpdateDistinctOrderStatusMessage(error.response.data.message);
            });

        setUpdateDataClicked(true);
    }

    //delete distinct order
    //setting delete view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

    //Validating the input tag
    const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
    const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleDeleteDistinctOrderPopup() {
        setViewDelete(!viewDelete);
        setDeleteSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for update
    function onSubmitValidateinputForDelete(event) {
        event.preventDefault();

        toggleDeleteDistinctOrderConfirmation();
    }

    function toggleDeleteDistinctOrderConfirmation() {

        console.log('in toggleDeleteDistinctOrderConfirmation');
        setViewDelete(!viewDelete);
        setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
        toggleDeleteDistinctOrderPopup();
        setDeleteSubmitStatus(false);
        setOrderNoUpdate(0);
    }

    function closePopupDeleteDistinctOrderConfirmation() {
        setOrderNoUpdate(0);

        setDeleteDataClicked(false);
        setDeleteDistinctOrderStatus(false);
        setDeleteDistinctOrderStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(true);
        setViewConfirmationDeletePopupOpen(false);
        console.log('in here');
    }

    //final close
    function handleCloseDeletePopups(event) {
        setOrderNoUpdate(0);

        setDeleteDataClicked(false);
        setDeleteDistinctOrderStatus(false);
        setDeleteDistinctOrderStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(false);
        setViewConfirmationDeletePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [deleteDistinctOrderStatus, setDeleteDistinctOrderStatus] = useState(false);
    const [deleteDistinctOrderStatusMessage, setDeleteDistinctOrderStatusMessage] = useState(false);
    //For showing the result message
    const [deleteDataClicked, setDeleteDataClicked] = useState(false);

    async function deleteDistinctOrder() {
        console.log('called delete distinct order');


        await ambrosialAxiosAPI.delete(`/deletedistinctOrder/${orderNoId}`)
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setDeleteDistinctOrderStatus(response.data.status);
                setDeleteDistinctOrderStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setDeleteDistinctOrderStatus(error.response.data.status);
                setDeleteDistinctOrderStatusMessage(error.response.data.message);
            });

        setDeleteDataClicked(true);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log('viewUpdate:', viewUpdate);
    console.log('viewConfirmationUpdatePopupOpen:', viewConfirmationUpdatePopupOpen);

    //UseEffect to track the different popups
    useEffect(async () => {

        if ((createOrderPopupOpen === true)) {
            setModalVisible(true);
        }

        if ((confirmationOrderPopupOpen === true)) {
            setModalVisible(true);
        }

        if ((viewOrder === true)) {
            setModalVisible(true);
        }

        if ((viewUpdate === true)) {
            setModalVisible(true);
        }

        if ((viewConfirmationUpdatePopupOpen === true)) {
            setModalVisible(true);
        }

        if ((viewDelete === true)) {
            setModalVisible(true);
        }

        if ((viewConfirmationDeletePopupOpen === true)) {
            setModalVisible(true);
        }

        if ((createOrderPopupOpen === false) && (confirmationOrderPopupOpen === false) && (viewOrder === false) && (viewUpdate === false) && (viewConfirmationUpdatePopupOpen === false) && (viewDelete === false) && (viewConfirmationDeletePopupOpen === false)) {
            setModalVisible(false);
        } else {
            console.log('not all popup states are false');
        }

    }, [createOrderPopupOpen, confirmationOrderPopupOpen, viewOrder, viewUpdate, viewConfirmationUpdatePopupOpen, viewDelete, viewConfirmationDeletePopupOpen]);


    return (
        <>
            <div className='createAndRefresh'>
                <button className='refreshList' onClick={getAllDistinctOrders}>Refresh List</button>
                <button className='createOrder' onClick={togglePopupCreateOrder}>Create Order</button>
            </div>

            {modalVisible ? <div className='modalContainer'></div> : null}
            {createOrderPopupOpen && <Popup
                popupType='createOrderPopup'
                handleClose={togglePopupCreateOrder}
                content={
                    <form className='formCreateDistinctOrder' onSubmit={onSubmitValidateInput}>
                        <label className='formHeaderCreateDistinctOrder'>Create Order</label>
                        <br></br>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateDistinctOrder'>Order No. </label>
                            <input type="number" className='createInputOrderNo' onChange={(e) => setOrderNoValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <button className='createOrderButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {submitStatusMessageStatus ? <label className='formLabelTextStatusCreateDistinctOrder'>{<label className='formLabelTextCreateDistinctOrder'>{submitStatusMessage}</label>}</label> : null}
                    </form>
                } />}


            {confirmationOrderPopupOpen && <Popup
                popupType='createOrderConfirmationPopup'
                handleClose={togglePopupCreateOrderConfirmation}
                content={
                    <ConfirmationPopupContents invokeAction={createDistinctOrder} invokeRefresh={getAllDistinctOrders} xButtonClose={closePopupCreateOrderConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage} />

                } />}

            {/* update Popup */}
            {viewUpdate && <Popup
                popupType='updateCurrentDistinctOrderPopup'
                handleClose={toggleUpdateDistinctOrderPopup}
                content={
                    <form className='formUpdateDistinctOrder' onSubmit={onSubmitValidateinputForUpdate}>
                        <label className='formHeaderUpdate'>Update Current Order</label>
                        <br></br>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdate'>Current Order No.</label>
                            <label className='formLabelOrderNoUpdate'>{viewOrderItemsOrderNo}</label>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdate'>Updated Order No.</label>
                            <input type="number" className='updateOrderNo' value={orderNoUpdate} onChange={(e) => setOrderNoUpdate(e.target.value)}></input>
                        </div>
                        <br></br>

                        <button className='updateCurrentDistinctOrderButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {updateSubmitStatus ? <label className='formLabelTextStatusUpdateDistinctOrder'>{<label className='formLabelTextUpdateDistinctOrder'>{updateSubmitStatusMessage}</label>}</label> : null}
                    </form>
                } />}

            {viewConfirmationUpdatePopupOpen && <Popup
                popupType='updateOrderConfirmationPopup'
                handleClose={toggleUpdateDistinctOrderConfirmation}
                content={
                    //props needed are: updateDistinctOrder(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateDistinctOrderStatusMessage
                    <ConfirmationPopupContents invokeAction={updateDistinctOrder} invokeRefresh={getAllDistinctOrders} xButtonClose={closePopupUpdateDistinctOrderConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateDistinctOrderStatusMessage} />
                } />}

            {/* delete Popup */}
            {viewDelete && <Popup
                popupType='deleteCurrentDistinctOrderPopup'
                handleClose={toggleDeleteDistinctOrderPopup}
                content={
                    <form className='formDeleteDistinctOrder' onSubmit={onSubmitValidateinputForDelete}>
                        <label className='formHeaderDelete'>Delete Order</label>
                        <br></br>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextDelete'>Order No.  </label>
                            <label className='formLabelOrderNoDelete'>{viewOrderItemsOrderNo}</label>
                        </div>
                        <br></br>

                        <button className='deleteCurrentDistinctOrderButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {deleteSubmitStatus ? <label className='formLabelTextStatusDeleteDistinctOrder'>{<label className='formLabelTextDeleteDistinctOrder'>{deleteSubmitStatusMessage}</label>}</label> : null}
                    </form>
                } />}

            {viewConfirmationDeletePopupOpen && <Popup
                popupType='deleteOrderConfirmationPopup'
                handleClose={toggleDeleteDistinctOrderConfirmation}
                content={
                    <ConfirmationPopupContents invokeAction={deleteDistinctOrder} invokeRefresh={getAllDistinctOrders} xButtonClose={closePopupDeleteDistinctOrderConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteDistinctOrderStatusMessage} />
                } />
            }


            <div className="orders">
                <h1 className='orderTitle'>Orders</h1>

                <table className='orderTable'>
                    <tr>
                        <th className='orderTableColumn'>No.</th>
                        <th className='orderTableColumn'>Order No.</th>
                        <th className='orderTableColumn'>Order Id</th>
                        <th className='orderTableColumn' colSpan='3'>Actions</th>
                    </tr>

                    {distinctOrderData.map((distinctOrder, index) => (
                        <tr key={distinctOrder.orderNo}>
                            <td className='orderTableColumn'>{index + 1}</td>
                            <td className='orderTableColumn'>{distinctOrder.orderNo}</td>
                            <td className='orderTableColumn'>{distinctOrder.orderNoId}</td>
                            <td className='actionButtons'><ViewOrderItemsButton orderNoId={distinctOrder.orderNoId} setOrderNoId={setOrderNoId} setOrderNo={setViewOrderItemsOrderNo} orderNo={distinctOrder.orderNo} setViewOrder={setViewOrder} /></td>
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setOrderNoId} id={distinctOrder.orderNoId} setData={setViewOrderItemsOrderNo} data={distinctOrder.orderNo} setView={setViewUpdate} buttonText={"Update Order No."} /></td>
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setOrderNoId} id={distinctOrder.orderNoId} setData={setViewOrderItemsOrderNo} data={distinctOrder.orderNo} setView={setViewDelete} buttonText={"Delete Distinct Order"} /></td>
                        </tr>
                    )
                    )}

                </table>


                <ViewOrderItems orderNoId={orderNoId} setOrderNoId={setOrderNoId} orderNo={viewOrderItemsOrderNo} setOrderNo={setViewOrderItemsOrderNo} viewOrder={viewOrder} setViewOrder={setViewOrder} />

            </div>
        </>
    )
}
