import React, {useState} from 'react';
import Popup from '../components/popup/popup';
import './server.css';
import BellImg from '../../assets/bell.png';

export default function Server() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

    return (
    <>
      <img src={BellImg}
        className='server'
        alt="payment icon" 
        style={{height: 40, width: 40}}
        onClick={togglePopup} />
        
      {isOpen && <Popup 
      popupType='server-popup' 
      handleClose={togglePopup}
      content={<p className="server-content">Thank you for your patience.<br/>A server will be with you shortly.</p>}/>}
    </>);
}