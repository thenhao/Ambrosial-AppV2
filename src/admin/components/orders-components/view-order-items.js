import './view-order-items.css'
import Popup from '../popup';
import { useEffect, useState } from 'react';
import capitalize from 'capitalize-the-first-letter';
import { ambrosialAxiosAPI } from '../../../api/api';
import UpdateAndDeleteButton from '../common-components/update-and-delete-button';
import ConfirmationPopupContents from '../common-components/confirmation-popup-contents';


function ViewOrderItems(props) {

    //To show or hide the view orders
    function toggleViewOrderPopup() {
        props.setViewOrder(false);
        setOrderedItemsData([]);
        setOrderedItemsDataStatus(false);
    }

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
        //!orderNoIdValue || 
        if (!menuItemIDValue || !quantityValue || !totalItemPriceValue || !tableNoValue || !orderStatusValue) {
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

        setOrderNoIdValue(0);
        setMenuItemIDValue(0);
        setQuantityValue(0);
        setTotalItemPriceValue(0);
        setTableNoValue(0);
        setOrderStatusValue('');

        setPostDataClicked(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
        setSubmitStatusMessageStatus(false);
        setCreateOrderPopupOpen(true);
        setConfirmationOrderPopupOpen(false);

    }

    //final close
    function handleClosePopups(event) {
        //event.preventDefault();
        setOrderNoIdValue(0);
        setMenuItemIDValue(0);
        setQuantityValue(0);
        setTotalItemPriceValue(0);
        setTableNoValue(0);
        setOrderStatusValue('');
        setPostDataClicked(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
        setSubmitStatusMessageStatus(false);
        setCreateOrderPopupOpen(false);
        setConfirmationOrderPopupOpen(false);

    }

    //For the inputs to create order
    const [orderNoIdValue, setOrderNoIdValue] = useState(0);
    const [menuItemIDValue, setMenuItemIDValue] = useState(0);
    const [quantityValue, setQuantityValue] = useState(0);
    const [totalItemPriceValue, setTotalItemPriceValue] = useState(0);
    const [tableNoValue, setTableNoValue] = useState(0);
    const [orderStatusValue, setOrderStatusValue] = useState('');

    //For the result of the post
    const [postStatus, setPostStatus] = useState(false);
    const [postStatusMessage, setPostStatusMessage] = useState(false);
    //For showing the result message
    const [postDataClicked, setPostDataClicked] = useState(false);

    async function createOrder() {
        console.log('called create distinct order');


        await ambrosialAxiosAPI.post('/createorder', {
            //orderNoId: orderNoIdValue
            orderNoId: props.orderNoId,
            menuItemID: menuItemIDValue,
            quantity: quantityValue,
            totalItemPrice: totalItemPriceValue,
            tableNo: tableNoValue,
            orderStatus: orderStatusValue
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

    //update///////////////////////////////////////////////////////////////////////////
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);

    //setting of orderId for each row
    const [orderId, setOrderId] = useState(false);
    //setting of menuitem name for each row
    const [menuItemName, setMenuItemName] = useState(false);
    //const [orderNoUpdate, setOrderNoUpdate] = useState(0);

    console.log("orderId is ", orderId);
    //console.log("orderNoUpdate is ", orderNoUpdate);

    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleUpdateOrderItemsPopup() {
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for update
    function onSubmitValidateinputForUpdate(event) {
        event.preventDefault();
        console.log(orderNoIdValueUpdate);
        //!orderNoIdValueUpdate || 
        if (!menuItemIDValueUpdate || !quantityValueUpdate || !totalItemPriceValueUpdate || !tableNoValueUpdate || !orderStatusValueUpdate) {
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            console.log('inhere');
            return;
        }

        toggleUpdateOrderItemsConfirmation();
    }

    function toggleUpdateOrderItemsConfirmation() {
        // event.preventDefault();
        console.log('in toggle here');
        setViewUpdate(!viewUpdate);
        setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
        toggleUpdateOrderItemsPopup();
        setUpdateSubmitStatus(false);
        //setOrderNoUpdate(0);
    }

    function closePopupUpdateDistinctOrderConfirmation() {
        //setOrderNoUpdate(0);
        setOrderNoIdValueUpdate(0);
        setMenuItemIDValueUpdate(0);
        setQuantityValueUpdate(0);
        setTotalItemPriceValueUpdate(0);
        setTableNoValueUpdate(0);
        setOrderStatusValueUpdate('');

        setUpdateDataClicked(false);
        setUpdateOrderItemStatus(false);
        setUpdateOrderItemsStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(true);
        setViewConfirmationUpdatePopupOpen(false);
        console.log('in here');
    }

    //final close
    function handleCloseUpdatePopups(event) {
        //setOrderNoUpdate(0);
        setOrderNoIdValueUpdate(0);
        setMenuItemIDValueUpdate(0);
        setQuantityValueUpdate(0);
        setTotalItemPriceValueUpdate(0);
        setTableNoValueUpdate(0);
        setOrderStatusValueUpdate('');

        setUpdateDataClicked(false);
        setUpdateOrderItemStatus(false);
        setUpdateOrderItemsStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(false);
        setViewConfirmationUpdatePopupOpen(false);
    }

    //For the inputs to update order
    const [orderNoIdValueUpdate, setOrderNoIdValueUpdate] = useState(0);
    const [menuItemIDValueUpdate, setMenuItemIDValueUpdate] = useState(0);
    const [quantityValueUpdate, setQuantityValueUpdate] = useState(0);
    const [totalItemPriceValueUpdate, setTotalItemPriceValueUpdate] = useState(0);
    const [tableNoValueUpdate, setTableNoValueUpdate] = useState(0);
    const [orderStatusValueUpdate, setOrderStatusValueUpdate] = useState('');


    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [updateOrderItemStatus, setUpdateOrderItemStatus] = useState(false);
    const [updateOrderItemsStatusMessage, setUpdateOrderItemsStatusMessage] = useState(false);
    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);

    async function updateOrderItems() {
        console.log('called update order item');

        await ambrosialAxiosAPI.put(`/updateorder/${orderId}`, {
            //orderNoId: orderNoIdValueUpdate,
            orderNoId: props.orderNoId,
            menuItemID: menuItemIDValueUpdate,
            quantity: quantityValueUpdate,
            totalItemPrice: totalItemPriceValueUpdate,
            tableNo: tableNoValueUpdate,
            orderStatus: orderStatusValueUpdate
        })
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setUpdateOrderItemStatus(response.data.status);
                setUpdateOrderItemsStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setUpdateOrderItemStatus(error.response.data.status);
                setUpdateOrderItemsStatusMessage(error.response.data.message);
            });

        setUpdateDataClicked(true);
    }
    /////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////DELETE//////////////////////////////////////
    //delete distinct order
    //setting delete view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

    //Validating the input tag
    const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
    const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleDeleteOrderItemPopup() {
        setViewDelete(!viewDelete);
        setDeleteSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for update
    function onSubmitValidateinputForDelete(event) {
        event.preventDefault();

        toggleDeleteOrderItemConfirmation();
    }

    function toggleDeleteOrderItemConfirmation() {

        console.log('in toggleDeleteOrderItemConfirmation');
        setViewDelete(!viewDelete);
        setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
        toggleDeleteOrderItemPopup();
        setDeleteSubmitStatus(false);

    }

    function closePopupDeleteOrderItemConfirmation() {

        setDeleteDataClicked(false);
        setDeleteOrderItemStatus(false);
        setDeleteOrderItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(true);
        setViewConfirmationDeletePopupOpen(false);
        console.log('In closePopupDeleteOrderItemConfirmation');
    }

    //final close
    function handleCloseDeletePopups() {


        setDeleteDataClicked(false);
        setDeleteOrderItemStatus(false);
        setDeleteOrderItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(false);
        setViewConfirmationDeletePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [deleteOrderItemStatus, setDeleteOrderItemStatus] = useState(false);
    const [deleteOrderItemStatusMessage, setDeleteOrderItemStatusMessage] = useState(false);
    //For showing the result message
    const [deleteDataClicked, setDeleteDataClicked] = useState(false);

    async function deleteOrderItem() {
        console.log('called delete order item');


        await ambrosialAxiosAPI.delete(`/deleteorder/${orderId}`)
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setDeleteOrderItemStatus(response.data.status);
                setDeleteOrderItemStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setDeleteOrderItemStatus(error.response.data.status);
                setDeleteOrderItemStatusMessage(error.response.data.message);
            });

        setDeleteDataClicked(true);
    }
    /////////////////////////////////////////////////////////////////////////////
    //order data status and ordereditems data
    const [orderedItemsDataStatus, setOrderedItemsDataStatus] = useState(false);
    const [orderedItemsData, setOrderedItemsData] = useState([]);
    //api code to call orders table and get the value
    async function getAllOrderedItems() {
        await ambrosialAxiosAPI.get(`/vieworderitems/${props.orderNo}`)
            .then((response) => {
                console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                //Not in template literal as it will only show the type object
                console.log("response Data: ", response.data.data);
                setOrderedItemsData(response.data.data);
                setOrderedItemsDataStatus(true);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method`, `for route:, ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
            });
    }


    useEffect(async () => {
        if (props.viewOrder === true) {
            getAllOrderedItems();
        } else {
            setOrderedItemsData([]);
        }
    }, [props.viewOrder]);


    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    //UseEffect to track the different popups
    useEffect(async () => {

        if ((createOrderPopupOpen === true)) {
            setModalVisible(true);
        }

        if ((confirmationOrderPopupOpen === true)) {
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

        if ((createOrderPopupOpen === false) && (confirmationOrderPopupOpen === false) && (viewUpdate === false) && (viewConfirmationUpdatePopupOpen === false) && (viewDelete === false) && (viewConfirmationDeletePopupOpen === false)) {
            setModalVisible(false);
        } else {
            console.log('not all popup states are false');
        }

    }, [createOrderPopupOpen, confirmationOrderPopupOpen, viewUpdate, viewConfirmationUpdatePopupOpen, viewDelete, viewConfirmationDeletePopupOpen]);

    return (
        <>
            {props.viewOrder && <Popup
                popupType='viewOrderPopup'
                handleClose={toggleViewOrderPopup}
                content={
                    <div>
                        <table className='viewOrderItemsTable'>

                            <tr>
                                <td className='viewOrderItemsTableColumnData'>Order No.:</td>
                                <td className='viewOrderItemsTableColumnData'>{props.orderNo}</td>
                                <td></td>
                                <td></td>
                                <td colspan="2"><button className='createOrderItemsButton' onClick={togglePopupCreateOrder}>Create Order Item</button></td>
                            </tr>
                            <br></br>
                            <br></br>

                            <tr>
                                <th className='viewOrderItemsTableColumn'>No.</th>
                                <th className='viewOrderItemsTableColumn'>Item</th>
                                <th className='viewOrderItemsTableColumn'>Quantity</th>
                                <th className='viewOrderItemsTableColumn' colspan="2">Actions</th>
                            </tr>

                            {orderedItemsData ? orderedItemsData?.map((orderedItemsData, index) => (
                                
                                <tr key={orderedItemsData.orderNo}>
                                    <td className='viewOrderItemsTableColumnData'>{index + 1}</td>
                                    <td className='viewOrderItemsTableColumnData'>{capitalize(orderedItemsData.MenuItem.alt)}</td>
                                    <td className='viewOrderItemsTableColumnData'>{orderedItemsData.quantity}</td>
                                    <td className='actionButtons'><UpdateAndDeleteButton setId={setOrderId} id={orderedItemsData.orderID} setData={props.setOrderNo} data={props.orderNo} setView={setViewUpdate} buttonText={"Update Order Item"} /></td>
                                    <td className='actionButtons'><UpdateAndDeleteButton setId={setOrderId} id={orderedItemsData.orderID} setData={setMenuItemName} data={orderedItemsData.MenuItem.alt} setView={setViewDelete} buttonText={"Delete Order Item"} /></td>
                                </tr>
                            )
                            ) : <tr>
                                <td className='viewOrderItemsTableColumnData'>-</td>
                                <td className='viewOrderItemsTableColumnData'>-</td>
                                <td className='viewOrderItemsTableColumnData'>-</td>
                                <td className='viewOrderItemsTableColumnData' colSpan='2'>-</td>
                            </tr>}

                        </table>

                    </div>
                } />}


            {modalVisible ? <div className='modalViewOrderContainer'></div> : null}
            {createOrderPopupOpen && <Popup
                popupType='createOrderItemPopup'
                handleClose={togglePopupCreateOrder}
                content={
                    <form className='formCreateNewOrderItem' onSubmit={onSubmitValidateInput}>
                        <label className='formHeaderCreateOrderItem'>Create New Order Item</label>
                        <br></br>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateOrderNo'>Order Id.</label>
                            <input type="number" className='createInputNewOrderNoId' value={props.orderNoId} disabled></input>
                            {/* <input type="number" className='createInputNewOrderNoId' onChange={(e) => setOrderNoIdValue(e.target.value)}></input> */}
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateOrderMenuItemId'>Menu Item Id</label>
                            <input type="number" className='createInputNewMenuItemId' onChange={(e) => setMenuItemIDValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateOrderQuantity'>Quantity</label>
                            <input type="number" className='createInputNewQuantity' onChange={(e) => setQuantityValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateOrderTotalItemPrice'>Total Item Price</label>
                            <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputNewTotalItemPrice' onChange={(e) => setTotalItemPriceValue(e.target.value)} ></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateOrderTableNo'>Table No</label>
                            <input type="number" className='createInputNewTableNo' onChange={(e) => setTableNoValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateOrderOrderStatus'>Order Status</label>
                            <input type="text" className='createInputNewOrderStatus' onChange={(e) => setOrderStatusValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <button className='createOrderItemsButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {submitStatusMessageStatus ? <label className='formLabelTextStatusCreateOrder'>{<label className='formLabelTextCreateOrder'>{submitStatusMessage}</label>}</label> : null}
                    </form>
                } />}


            {confirmationOrderPopupOpen && <Popup
                popupType='createOrderItemConfirmationPopup'
                handleClose={closePopupCreateOrderConfirmation}
                content={
                    <ConfirmationPopupContents invokeAction={createOrder} invokeRefresh={getAllOrderedItems} xButtonClose={closePopupCreateOrderConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage} />
                } />}


            {/* update Popup */}
            {viewUpdate && <Popup
                popupType='updateOrderItemPopup'
                handleClose={toggleUpdateOrderItemsPopup}
                content={
                    <form className='formUpdateOrderItem' onSubmit={onSubmitValidateinputForUpdate}>
                        <label className='formHeaderUpdateOrderItem'>Update Order Item</label>
                        <br></br>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdateOrder'>Order No. Id</label>
                            {/* <input type="number" className='createInputUpdateOrderNoId' onChange={(e) => setOrderNoIdValueUpdate(e.target.value)}></input> */}
                            <input type="number" className='createInputUpdateOrderNoId' value={props.orderNoId} disabled></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdateOrderMenuItemId'>Menu Item Id</label>
                            <input type="number" className='createInputUpdateMenuItemId' onChange={(e) => setMenuItemIDValueUpdate(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdateOrderQuantity'>Quantity</label>
                            <input type="number" className='createInputUpdateQuantity' onChange={(e) => setQuantityValueUpdate(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdateOrderTotalItemPrice'>Total Item Price</label>
                            <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputUpdateTotalItemPrice' onChange={(e) => setTotalItemPriceValueUpdate(e.target.value)} ></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdateOrderTableNo'>Table No</label>
                            <input type="number" className='createInputUpdateTableNo' onChange={(e) => setTableNoValueUpdate(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextUpdateOrderOrderStatus'>Order Status</label>
                            <input type="text" className='createInputUpdateOrderStatus' onChange={(e) => setOrderStatusValueUpdate(e.target.value)}></input>
                        </div>
                        <br></br>

                        <button className='createOrderItemsButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {updateSubmitStatus ? <label className='formLabelTextStatusUpdateOrder'>{<label className='formLabelTextUpdateOrder'>{updateSubmitStatusMessage}</label>}</label> : null}
                    </form>
                } />}

            {viewConfirmationUpdatePopupOpen && <Popup
                popupType='updateOrderItemConfirmationPopup'
                handleClose={closePopupUpdateDistinctOrderConfirmation}
                content={
                    //props needed are: updateOrderItems(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateOrderItemsStatusMessage
                    <ConfirmationPopupContents invokeAction={updateOrderItems} invokeRefresh={getAllOrderedItems} xButtonClose={closePopupUpdateDistinctOrderConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateOrderItemsStatusMessage} />
                } />}

            {/* delete Popup */}
            {viewDelete && <Popup
                popupType='deleteOrderItemPopup'
                handleClose={toggleDeleteOrderItemPopup}
                content={
                    <form className='formDeleteOrderItem' onSubmit={onSubmitValidateinputForDelete}>
                        <label className='formHeaderDeleteOrderItem'>Delete Order Item</label>
                        <br></br>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextDeleteOrderItem'>Menu Item:&nbsp;</label>
                            <label className='formLabelMenuItem'>{capitalize(menuItemName)}</label>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <button className='deleteOrderItemButton'>Submit</button>
                        </div>
                        <br></br>
                        <br></br>

                        {deleteSubmitStatus ? <label className='formLabelTextStatusDeleteOrder'>{<label className='formLabelTextDeleteOrder'>{deleteSubmitStatusMessage}</label>}</label> : null}
                    </form>
                } />}

            {viewConfirmationDeletePopupOpen && <Popup
                popupType='deleteOrderItemConfirmationPopup'
                handleClose={toggleDeleteOrderItemConfirmation}
                content={
                    <ConfirmationPopupContents invokeAction={deleteOrderItem} invokeRefresh={getAllOrderedItems} xButtonClose={closePopupDeleteOrderItemConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteOrderItemStatusMessage} />
                } />
            }

        </>
    )
}

export default ViewOrderItems;