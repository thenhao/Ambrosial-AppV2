import './popup.css';

function Popup(props){

    if(props.popupType === 'member-popup'){
        return(
            <div className="member-popup-box">
                <div className="member-box">
                    <span className="member-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'payment-popup'){
        return(
            <div className="payment-popup-box">
                <div className="payment-box">
                    <span className="payment-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'server-popup'){
        return(
            <div className="server-popup-box">
                <div className="server-box">
                    <span className="server-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'orderlist-popup'){
        return(
            <div className="orderlist-popup-box">
                <div className="orderlist-box">
                    <span className="orderlist-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'orderbill-popup'){
        return(
            <div className="orderbill-popup-box">
                <div className="orderbill-box">
                    <span className="orderbill-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    
}

export default Popup;