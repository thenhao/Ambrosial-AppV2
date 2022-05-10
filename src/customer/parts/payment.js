import React, {useState} from 'react';
import './payment.css';
import BillImg from '../../assets/bill.png';
import Popup from '../components/popup/popup';

export default function Payment() {
    const [isOpen, setIsOpen] = useState(false);

    function togglePopup() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="payment">
                <img src={BillImg} 
                alt="payment icon" 
                style={{height: 40, width: 40}}
                onClick={togglePopup} />
            </div>
            
        
            {isOpen && <Popup
            popupType='payment-popup'
            handleClose={togglePopup}
            content={<p className='payment-content'>Thank you for your patience.<br/>Your bill will arrive shortly.</p>}/>}   
        </>    
    );
}