import './popup.css';

function Popup(props) {

    if (props.popupType === 'loginPopup') {
        return (
            <div className="loginPopup-box">
                <span className="login-close-icon" onClick={props.handleClose}>x</span>
                <div className="login-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updatePasswordErrorPopup') {
        return (
            <div className="updatePasswordErrorPopup-box">
                <span className="updatePasswordError-close-icon" onClick={props.handleClose}>x</span>
                <div className="updatePasswordError-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updatePasswordSuccessPopup') {
        return (
            <div className="updatePasswordSuccessPopup-box">
                <span className="updatePasswordSuccess-close-icon" onClick={props.handleClose}>x</span>
                <div className="updatePasswordSuccess-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createOrderPopup') {
        return (
            <div className="createOrderPopup-box">
                <div className="createOrder-box">
                    <span className="createOrder-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createOrderConfirmationPopup') {
        return (
            <div className="createOrderConfirmationPopup-box">
                <div className="createOrderConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'viewOrderPopup') {
        return (
            <div className="viewOrderPopup-box">
                <div className="viewOrder-box">
                    <span className="viewOrder-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createOrderItemPopup') {
        return (
            <div className="createOrderItemPopup-box">
                <div className="createOrderItem-box">
                    <span className="createOrderItem-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createOrderItemConfirmationPopup') {
        return (
            <div className="createOrderItemConfirmationPopup-box">
                <div className="createOrderItemConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateCurrentDistinctOrderPopup') {
        return (
            <div className="updateCurrentDistinctOrderPopup-box">
                <div className="updateCurrentDistinctOrder-box">
                    <span className="updateCurrentDistinctOrder-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateOrderConfirmationPopup') {
        return (
            <div className="updateOrderConfirmationPopup-box">
                <div className="updateOrderConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateOrderItemPopup') {
        return (
            <div className="updateOrderItemPopup-box">
                <div className="updateOrderItem-box">
                    <span className="updateOrderItem-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateOrderItemConfirmationPopup') {
        return (
            <div className="updateOrderItemConfirmationPopup-box">
                <div className="updateOrderItemConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteCurrentDistinctOrderPopup') {
        return (
            <div className="deleteCurrentDistinctOrderPopup-box">
                <div className="deleteCurrentDistinctOrder-box">
                    <span className="deleteCurrentDistinctOrder-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteOrderConfirmationPopup') {
        return (
            <div className="deleteOrderConfirmationPopup-box">
                <div className="deleteOrderConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteOrderItemPopup') {
        return (
            <div className="deleteOrderItemPopup-box">
                <div className="deleteOrderItem-box">
                    <span className="deleteOrderItem-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteOrderItemConfirmationPopup') {
        return (
            <div className="deleteOrderItemConfirmationPopup-box">
                <div className="deleteOrderItemConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createReceiptPopup') {
        return (
            <div className="createReceiptPopup-box">
                <div className="createReceipt-box">
                    <span className="createReceipt-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'viewReceiptsItemsPopup') {
        return (
            <div className="viewReceiptsItemsPopup-box">
                <div className="viewReceiptsItems-box">
                    <span className="viewReceiptsItems-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createReceiptConfirmationPopup') {
        return (
            <div className="createReceiptConfirmationPopup-box">
                <div className="createReceiptConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateReceiptPopup') {
        return (
            <div className="updateReceiptPopup-box">
                <div className="updateReceipt-box">
                    <span className="updateReceipt-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateReceiptConfirmationPopup') {
        return (
            <div className="updateReceiptConfirmationPopup-box">
                <div className="updateReceiptConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteReceiptPopup') {
        return (
            <div className="deleteReceiptPopup-box">
                <div className="deleteReceipt-box">
                    <span className="deleteReceipt-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteReceiptConfirmationPopup') {
        return (
            <div className="deleteReceiptConfirmationPopup-box">
                <div className="deleteReceiptConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'viewReceiptPopup') {
        return (
            <div className="viewReceiptPopup-box">
                <div className="viewReceipt-box">
                    <span className="viewReceipt-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createPaymentPopup') {
        return (
            <div className="createPaymentPopup-box">
                <div className="createPayment-box">
                    <span className="createPayment-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createPaymentConfirmationPopup') {
        return (
            <div className="createPaymentConfirmationPopup-box">
                <div className="createPaymentConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updatePaymentPopup') {
        return (
            <div className="updatePaymentPopup-box">
                <div className="updatePayment-box">
                    <span className="updatePayment-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updatePaymentConfirmationPopup') {
        return (
            <div className="updatePaymentConfirmationPopup-box">
                <div className="updatePaymentConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deletePaymentPopup') {
        return (
            <div className="deletePaymentPopup-box">
                <div className="deletePayment-box">
                    <span className="deletePayment-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deletePaymentConfirmationPopup') {
        return (
            <div className="deletePaymentConfirmationPopup-box">
                <div className="deletePaymentConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }

    //For Menu Item PopupType: Update and Update Confirmation
    else if (props.popupType === 'updateMenuItemPopup') {
        return (
            <div className="updateMenuItemPopup-box">
                <div className="updateMenuItem-box">
                    <span className="updateMenuItem-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'updateMenuItemConfirmationPopup') {
        return (
            <div className="updateMenuItemConfirmationPopup-box">
                <div className="updateMenuItemConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    //For Menu Item PopupType: Delete and Delete Confirmation
    else if (props.popupType === 'deleteMenuItemPopup') {
        return (
            <div className="deleteMenuItemPopup-box">
                <div className="deleteMenuItem-box">
                    <span className="deleteMenuItem-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'deleteMenuItemConfirmationPopup') {
        return (
            <div className="deleteMenuItemConfirmationPopup-box">
                <div className="deleteMenuItemConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }
    //For Menu Item PopupType: Create and Create Confirmation

    else if (props.popupType === 'createMenuItemPopup') {
        return (
            <div className="createMenuItemPopup-box">
                <div className="createMenuItem-box">
                    <span className="createMenuItem-close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
                </div>
            </div>
        );
    }
    else if (props.popupType === 'createMenuItemConfirmationPopup') {
        return (
            <div className="createMenuItemConfirmationPopup-box">
                <div className="createMenuItemConfirmation-box">
                    {props.content}
                </div>
            </div>
        );
    }


}

export default Popup;