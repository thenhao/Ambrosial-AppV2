import './view-order-items-button.css';

function ViewOrderItemsButton(props){

    function setOrderNo(){
        props.setOrderNoId(props.orderNoId);
        props.setOrderNo(props.orderNo);
        props.setViewOrder(true);
    }

    return(
        <>
            <button className="viewOrderItemsButton" onClick={setOrderNo}>View Order Items</button>
        </>
    )
}

export default ViewOrderItemsButton;


