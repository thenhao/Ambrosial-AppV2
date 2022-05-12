import './menu.css';
import React, { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../components/popup';
import UpdateAndDeleteButton from '../components/common-components/update-and-delete-button';
import ConfirmationPopupContents from '../components/common-components/confirmation-popup-contents';

export default function Menu() {

    //submit popup and confirmation popup
    const [createMenuItemPopupOpen, setCreateMenuItemPopupOpen] = useState(false);
    const [confirmationMenuItemPopupOpen, setConfirmationMenuItemPopupOpen] = useState(false);

    function togglePopupCreateMenuItem() {
        setCreateMenuItemPopupOpen(!createMenuItemPopupOpen);
        setSubmitStatusMessageStatus(false);
        setModalVisible(!modalVisible);
    }

    //State to see empty string and status message
    const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
    const [submitStatusMessage, setSubmitStatusMessage] = useState('');

    //validation on submit
    function onSubmitValidateInput(event) {
        event.preventDefault();

        if (!menuItemSrcValue || !menuItemAltValue || !menuItemTypeValue || !menuItemPriceValue || !menuItemCategoryValue || !menuItemChefRecommendationValue) {
            setSubmitStatusMessageStatus(true);
            setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            return;
        }

        togglePopupCreateMenuItemConfirmation();
    }

    function togglePopupCreateMenuItemConfirmation() {
        // event.preventDefault();
        console.log('in toggle here');
        setConfirmationMenuItemPopupOpen(!confirmationMenuItemPopupOpen);
        togglePopupCreateMenuItem();
        setSubmitStatusMessageStatus(false);
    }
    function closePopupCreateMenuItemConfirmation() {
        console.log('in closePopupCreateMenuItemConfirmation here');

        setMenuItemIDValue(0);
        setMenuItemSrcValue(0);
        setMenuItemAltValue(0);
        setMenuItemTypeValue(0);
        setMenuItemPriceValue(0);
        setMenuItemCategoryValue(0);
        setMenuItemChefRecommendationValue(0);

        setPostDataClicked(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
        setSubmitStatusMessageStatus(false);
        setCreateMenuItemPopupOpen(true);
        setConfirmationMenuItemPopupOpen(false);
    }

    // //final close
    function handleClosePopups() {

        setMenuItemIDValue(0);
        setMenuItemSrcValue(0);
        setMenuItemAltValue(0);
        setMenuItemTypeValue(0);
        setMenuItemPriceValue(0);
        setMenuItemCategoryValue(0);
        setMenuItemChefRecommendationValue(0);

        setPostDataClicked(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
        setSubmitStatusMessageStatus(false);
        setCreateMenuItemPopupOpen(false);
        setConfirmationMenuItemPopupOpen(false);
    }

    //For the inputs to create order
    const [menuItemIDValue, setMenuItemIDValue] = useState(0);
    const [menuItemSrcValue, setMenuItemSrcValue] = useState(0);
    const [menuItemAltValue, setMenuItemAltValue] = useState(0);
    const [menuItemTypeValue, setMenuItemTypeValue] = useState(0);
    const [menuItemPriceValue, setMenuItemPriceValue] = useState(0);
    const [menuItemCategoryValue, setMenuItemCategoryValue] = useState(0);
    const [menuItemChefRecommendationValue, setMenuItemChefRecommendationValue] = useState(0);

    console.log(menuItemIDValue, menuItemSrcValue, menuItemAltValue, menuItemTypeValue, menuItemPriceValue, menuItemCategoryValue, menuItemChefRecommendationValue)
    //For the result of the post
    const [postStatus, setPostStatus] = useState(false);
    const [postStatusMessage, setPostStatusMessage] = useState(false);
    //For showing the result message
    const [postDataClicked, setPostDataClicked] = useState(false);

    async function createDistinctMenuItem() {
        console.log('called create distinct menu item');

        await ambrosialAxiosAPI.post('/new-mi', {
            //menuItemID: menuItemIDValue,
            src: menuItemSrcValue,
            alt: menuItemAltValue,
            type: menuItemTypeValue,
            price: menuItemPriceValue,
            category: menuItemCategoryValue,
            chefRecommendation: menuItemChefRecommendationValue,
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

    //========== Get Request: All Menu Items ==========

    useEffect(async () => {
        //preload the menu items
        getAllMenuItems();

    }, []);


    //To get all menu data
    const [menuItemData, setMenuItemData] = useState([]);

    async function getAllMenuItems() {
        await ambrosialAxiosAPI.get('/findall-mi')
            .then((response) => {
                console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                //Not in template literal as it will only show the type object
                console.log("response Data: ", response.data.data);
                setMenuItemData(response.data.data);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method`, `for route:, ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
            });
    }

    // //This is for viewing a distintive Menu Item (Refer to view-order-items.js line 135 from this point onwards for viewing/updates)

    const [viewMenuItemID, setViewMenuItemID] = useState(0);
    // const [viewMenuItemSrc, setViewMenuItemSrc] = useState(0);
    const [viewMenuItemAlt, setViewMenuItemAlt] = useState(0);
    // const [viewMenuItemType, setViewMenuItemType] = useState(0);
    // const [viewMenuItemPrice, setViewMenuItemPrice] = useState(0);
    // const [viewMenuItemCategory, setViewMenuItemCategory] = useState(0);
    // const [viewMenuItemChefRecommendation, setViewMenuItemChefRecommendation] = useState(0);

    //========== This is for Updating of Menu Item
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);
    console.log("viewUpdate is ", viewUpdate);
    console.log("viewConfirmationUpdatePopupOpen is ", viewConfirmationUpdatePopupOpen);

    //setting of Menu Item ID for each row
    const [menuItemID, setMenuItemID] = useState(false);
    //const [menuItemUpdate, setMenuItemUpdate] = useState(0);

    console.log("Menu Item ID is ", menuItemID);
    //console.log("Menu Item Update is ", menuItemUpdate);

    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //setting of the update distinct menu Item confirmation

    //function to toggle the popup update
    function toggleUpdateMenuItemPopup() {
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
    }


    //function to validate the input tag for update
    function onSubmitValidateinputForUpdate(event) {
        event.preventDefault();
        console.log(menuItemIDValueUpdate);
        if (!menuItemSrcValueUpdate || !menuItemTypeValueUpdate || !menuItemPriceValueUpdate || !menuItemCategoryValueUpdate || !menuItemChefRecommendationValueUpdate) {
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            console.log('inhere');
            return;
        }

        toggleUpdateMenuItemConfirmation();
    }

    function toggleUpdateMenuItemConfirmation() {
        // event.preventDefault();
        console.log('in toggle here');
        setViewUpdate(!viewUpdate);
        setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
        toggleUpdateMenuItemPopup();
        setUpdateSubmitStatus(false);
        //setOrderNoUpdate(0);
    }

    function closePopupUpdateMenuItemConfirmation() {
        setMenuItemIDValueUpdate(0);
        setMenuItemSrcValueUpdate(0);
        setMenuItemAltValueUpdate(0);
        setMenuItemTypeValueUpdate(0);
        setMenuItemPriceValueUpdate(0);
        setMenuItemCategoryValueUpdate(0);
        setMenuItemChefRecommendationValueUpdate(0);

        setUpdateDataClicked(false);
        setUpdateMenuItemStatus(false);
        setUpdateMenuItemStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(true);
        setViewConfirmationUpdatePopupOpen(false);
        console.log('in here');
    }

    //final close
    function handleCloseUpdatePopups(event) {
        setMenuItemIDValueUpdate(0);
        setMenuItemSrcValueUpdate(0);
        setMenuItemAltValueUpdate(0);
        setMenuItemTypeValueUpdate(0);
        setMenuItemPriceValueUpdate(0);
        setMenuItemCategoryValueUpdate(0);
        setMenuItemChefRecommendationValueUpdate(0);

        setUpdateDataClicked(false);
        setUpdateMenuItemStatus(false);
        setUpdateMenuItemStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(false);
        setViewConfirmationUpdatePopupOpen(false);
    }

    //For the inputs to update order
    const [menuItemIDValueUpdate, setMenuItemIDValueUpdate] = useState(0);
    const [menuItemSrcValueUpdate, setMenuItemSrcValueUpdate] = useState(0);
    const [menuItemAltValueUpdate, setMenuItemAltValueUpdate] = useState(0);
    const [menuItemTypeValueUpdate, setMenuItemTypeValueUpdate] = useState(0);
    const [menuItemPriceValueUpdate, setMenuItemPriceValueUpdate] = useState(0);
    const [menuItemCategoryValueUpdate, setMenuItemCategoryValueUpdate] = useState(0);
    const [menuItemChefRecommendationValueUpdate, setMenuItemChefRecommendationValueUpdate] = useState(0);

    console.log(menuItemIDValueUpdate, menuItemSrcValueUpdate, menuItemAltValueUpdate, menuItemTypeValueUpdate, menuItemPriceValueUpdate, menuItemCategoryValueUpdate, menuItemChefRecommendationValueUpdate)
    //setting of update being clicked and updating of menu itemID for distinct order
    //For the result of the post
    const [updateMenuItemStatus, setUpdateMenuItemStatus] = useState(false);
    const [updateMenuItemStatusMessage, setUpdateMenuItemStatusMessage] = useState(false);


    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);

    async function updateMenuItem() {
        console.log('called update menu item');

        await ambrosialAxiosAPI.put(`/update-mi/${menuItemID}`, {

            // field that is not needed in Menu Item for changing
            // orderNoId: orderNoIdValueUpdate,
            //menuItemID: menuItemIDValueUpdate,
            src: menuItemSrcValueUpdate,
            alt: menuItemAltValueUpdate,
            type: menuItemTypeValueUpdate,
            price: menuItemPriceValueUpdate,
            category: menuItemCategoryValueUpdate,
            chefRecommendation: menuItemChefRecommendationValueUpdate,
        })
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setUpdateMenuItemStatus(response.data.status);
                setUpdateMenuItemStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setUpdateMenuItemStatus(error.response.data.status);
                setUpdateMenuItemStatusMessage(error.response.data.message);
            });

        setUpdateDataClicked(true);
    }

    //========== This is for Deleting of Menu Item
    //setting delete view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

    //Validating the input tag
    const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
    const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleDeleteMenuItemPopup() {
        setViewDelete(!viewDelete);
        setDeleteSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for delete
    function onSubmitValidateinputForDelete(event) {
        event.preventDefault();

        toggleDeleteMenuItemConfirmation();
    }

    function toggleDeleteMenuItemConfirmation() {

        console.log('in toggleDeleteMenuItemConfirmation');
        setViewDelete(!viewDelete);
        setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
        toggleDeleteMenuItemPopup();
        setDeleteSubmitStatus(false);

    }

    function closePopupDeleteMenuItemConfirmation() {

        setDeleteDataClicked(false);
        setDeleteMenuItemStatus(false);
        setDeleteMenuItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(true);
        setViewConfirmationDeletePopupOpen(false);
        console.log('In closePopupDeleteMenuItemConfirmation');
    }

    //final close
    function handleCloseDeletePopups() {


        setDeleteDataClicked(false);
        setDeleteMenuItemStatus(false);
        setDeleteMenuItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(false);
        setViewConfirmationDeletePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [deleteMenuItemStatus, setDeleteMenuItemStatus] = useState(false);
    const [deleteMenuItemStatusMessage, setDeleteMenuItemStatusMessage] = useState(false);
    //For showing the result message
    const [deleteDataClicked, setDeleteDataClicked] = useState(false);

    async function deleteMenuItem() {
        console.log('called delete menu item');


        await ambrosialAxiosAPI.delete(`/delete-mi/${menuItemID}`)
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setDeleteMenuItemStatus(response.data.status);
                setDeleteMenuItemStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setDeleteMenuItemStatus(error.response.data.status);
                setDeleteMenuItemStatusMessage(error.response.data.message);
            });

        setDeleteDataClicked(true);
    }

    // ===============================================


    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log('viewUpdate:', viewUpdate);
    console.log('viewConfirmationUpdatePopupOpen:', viewConfirmationUpdatePopupOpen);

    //UseEffect to track the different popups
    useEffect(async () => {

        if ((createMenuItemPopupOpen === true)) {
            setModalVisible(true);
        }

        if ((confirmationMenuItemPopupOpen === true)) {
            setModalVisible(true);
        }

        // if ((viewMenuItem === true)) {
        //     setModalVisible(true);
        // }

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

        // if ((createMenuItemPopupOpen === false) && (confirmationMenuItemPopupOpen === false) && (viewMenuItem === false) && (viewUpdate === false) && (viewConfirmationUpdatePopupOpen === false) && (viewDelete === false) && (viewConfirmationDeletePopupOpen === false)) {
        //     setModalVisible(false);

        if ((createMenuItemPopupOpen === false) && (confirmationMenuItemPopupOpen === false) && (viewUpdate === false) && (viewConfirmationUpdatePopupOpen === false) && (viewDelete === false) && (viewConfirmationDeletePopupOpen === false)) {
            setModalVisible(false);
        }
        else {
            console.log('not all popup states are false');
        }

    }, [createMenuItemPopupOpen, confirmationMenuItemPopupOpen, viewUpdate, viewConfirmationUpdatePopupOpen, viewDelete, viewConfirmationDeletePopupOpen]);

    return (
        <>
            <div className='createAndRefreshMenuItem'>
                <button className='createMenuItemButton' onClick={togglePopupCreateMenuItem}>Create Menu Item</button>
            </div>

            {modalVisible ? <div className='modalContainer'></div> : null}
            {createMenuItemPopupOpen && <Popup
                popupType='createMenuItemPopup'
                handleClose={togglePopupCreateMenuItem}
                content={
                    <form onSubmit={onSubmitValidateInput}>
                        <label className='menuFormHeader'>Create Menu Item</label>
                        <br></br>
                        <br></br>
                        {/* Input fields for menu item popup */}
                        <div className='label-input-div'>
                            <label className='formLabelTextCreateMenuItem'>Item Image</label>
                            <input type="text" className='createMenuItemInput' onChange={(e) => setMenuItemSrcValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateMenuItem'>Item Description</label>
                            <input type="text" className='createMenuItemInput' onChange={(e) => setMenuItemAltValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateMenuItem'>Type</label>
                            <input type="text" className='createMenuItemInput' onChange={(e) => setMenuItemTypeValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateMenuItem'>Price</label>
                            <input type="number" step="0.01" pattern='/^[0-9]+$/' className='createMenuItemInput' onChange={(e) => setMenuItemPriceValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateMenuItem'>Category</label>
                            <input type="text" className='createMenuItemInput' onChange={(e) => setMenuItemCategoryValue(e.target.value)}></input>
                        </div>
                        <br></br>

                        <div className='label-input-div'>
                            <label className='formLabelTextCreateMenuItem'>Chef Recommendation</label>
                            <input type="text" className='createMenuItemInput' onChange={(e) => setMenuItemChefRecommendationValue(e.target.value)}></input>
                        </div>
                        <br></br>


                        <button className='menuItemButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {submitStatusMessageStatus ? <label className='menuFormLabelTextStatus'>{<label className='menuFormLabelText'>{submitStatusMessage}</label>}</label> : null}
                    </form>
                } />}


            {confirmationMenuItemPopupOpen && <Popup
                popupType='createMenuItemConfirmationPopup'
                handleClose={togglePopupCreateMenuItemConfirmation}
                content={
                        <ConfirmationPopupContents invokeAction={createDistinctMenuItem} invokeRefresh={getAllMenuItems} xButtonClose={closePopupCreateMenuItemConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage} />
                } />}


            {/* update Popup */}
            {
                viewUpdate && <Popup
                    popupType='updateMenuItemPopup'
                    handleClose={toggleUpdateMenuItemPopup}
                    content={
                        <form onSubmit={onSubmitValidateinputForUpdate}>
                            <label className='menuFormHeader'>Update Menu Item</label>
                            <br></br>
                            <br></br>
                            {/* Retrieve menuItemID from backend */}
                            <div className='label-input-div'>
                                <label className='formLabelMenuItem'>Menu Item ID:&nbsp;&nbsp;</label>
                                <label className='formLabelMenuItem'>{viewMenuItemID}</label>
                            </div>
                            <br></br>

                            {/* Input fields for menu item popup */}
                            <div className='label-input-div'>
                            <label className='formLabelTextUpdateMenuItem'>Item Image</label>
                            <input type="text" className='updateMenuItemInput' onChange={(e) => setMenuItemSrcValueUpdate(e.target.value)}></input>
                            </div>
                            <br></br>

                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateMenuItem'>Item Description</label>
                                <input type="text" className='updateMenuItemInput' onChange={(e) => setMenuItemAltValueUpdate(e.target.value)}></input>
                            </div>
                            <br></br>

                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateMenuItem'>Type</label>
                                <input type="text" className='updateMenuItemInput' onChange={(e) => setMenuItemTypeValueUpdate(e.target.value)}></input>
                            </div>
                            <br></br>

                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateMenuItem'>Price</label>
                                <input type="number" step="0.01" className='updateMenuItemInput' onChange={(e) => setMenuItemPriceValueUpdate(e.target.value)}></input>
                            </div>
                            <br></br>

                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateMenuItem'>Category</label>
                                <input type="text" className='updateMenuItemInput' onChange={(e) => setMenuItemCategoryValueUpdate(e.target.value)}></input>
                            </div>
                            <br></br>

                            <div className='label-input-div'>
                                <label className='formLabelTextUpdateMenuItem'>Chef Recommendation</label>
                                <input type="text" className='updateMenuItemInput' onChange={(e) => setMenuItemChefRecommendationValueUpdate(e.target.value)}></input>
                            </div>
                            <br></br>

                            <button className='menuItemButton'>Submit</button>
                            <br></br>
                            <br></br>

                            {updateSubmitStatus ? <label className='menuFormLabelTextStatus'>{<label className='menuFormLabelText'>{updateSubmitStatusMessage}</label>}</label> : null}
                        </form>
                    } />
            }

            {
                viewConfirmationUpdatePopupOpen && <Popup
                    popupType='updateMenuItemConfirmationPopup'
                    handleClose={closePopupUpdateMenuItemConfirmation}
                    content={
                        //props needed are: updateMenuItem(), closePopupUpdateMenuItemConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateMenuOrderStatusMessage
                        <ConfirmationPopupContents invokeAction={updateMenuItem} invokeRefresh={getAllMenuItems} xButtonClose={closePopupUpdateMenuItemConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateMenuItemStatusMessage} />
                    } />
            }

            {/* delete Popup */}
            {
                viewDelete && <Popup
                    popupType='deleteMenuItemPopup'
                    handleClose={toggleDeleteMenuItemPopup}
                    content={
                        <form onSubmit={onSubmitValidateinputForDelete}>
                            <label className='menuFormHeader'>Delete Menu Item Record</label>
                            <br></br>
                            <br></br>
                            {/* Retrieve menuItemID from backend */}
                            <div className='label-input-div'>
                                <label className='formLabelTextDeleteMenuItem'>Menu Item:&nbsp;&nbsp;</label>
                                <label className='formLabelMenuItem'>{viewMenuItemID}</label>
                            </div>
                            <br></br>

                            <button className='menuItemButton'>Submit</button>
                            <br></br>
                            <br></br>

                            {deleteSubmitStatus ? <label className='menuItemFormLabelTextStatus'>{<label className='menuFormLabelText'>{deleteSubmitStatusMessage}</label>}</label> : null}
                        </form>
                    } />
            }

            {
                viewConfirmationDeletePopupOpen && <Popup
                    popupType='deleteMenuItemConfirmationPopup'
                    handleClose={toggleDeleteMenuItemConfirmation}
                    content={
                        <ConfirmationPopupContents invokeAction={deleteMenuItem} invokeRefresh={getAllMenuItems} xButtonClose={closePopupDeleteMenuItemConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteMenuItemStatusMessage} />
                    } />
            }

            <div className="menuItemsContainer">
                <h1 className='menuItemsTitle'>Menu</h1>
                <table className='menuItemsTable'>
                    <tr>
                        <th className='menuItemsColumn'>Menu Item ID</th>
                        <th className='menuItemsColumn'>Image</th>
                        <th className='menuItemsColumn'>Name</th>
                        <th className='menuItemsColumn'>Type</th>
                        <th className='menuItemsColumn'>Price</th>
                        <th className='menuItemsColumn'>Category</th>
                        <th className='menuItemsColumn'>Chef Recommendation</th>
                        <th className='menuItemsColumn' colSpan='2'>Action</th>
                    </tr>

                    {menuItemData ? menuItemData?.map((allMenuItems, index) => (
                        <tr key={allMenuItems.menuItemID}>
                            <td className='menuItemsColumn'>{index + 1}</td>
                            <td className='menuItemsColumn'><img class="menuItems-image" src={allMenuItems.src}></img></td>
                            <td className='menuItemsColumn'>{allMenuItems.alt}</td>
                            <td className='menuItemsColumn'>{allMenuItems.type}</td>
                            <td className='menuItemsColumn'>{allMenuItems.price}</td>
                            <td className='menuItemsColumn'>{allMenuItems.category}</td>
                            <td className='menuItemsColumn'>{allMenuItems.chefRecommendation ? "Yes" : "No"}</td>

                            <td className='actionButtons'><UpdateAndDeleteButton setId={setMenuItemID} id={allMenuItems.menuItemID} setData={setViewMenuItemID} data={allMenuItems.menuItemID} setView={setViewUpdate} buttonText={"Update Menu Item"} /></td>
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setMenuItemID} id={allMenuItems.menuItemID} setData={setViewMenuItemID} data={allMenuItems.menuItemID} setView={setViewDelete} buttonText={"Delete Menu Item"} /></td>
                        </tr>
                    )
                    ): null}

                </table>



            </div>

        </>
    )

}
