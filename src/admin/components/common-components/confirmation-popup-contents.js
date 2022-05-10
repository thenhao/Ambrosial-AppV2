import React from 'react';
import './confirmation-popup-contents.css';

function ConfirmationPopupContents(props){

    //update example:
    //props needed are: updateDistinctOrder(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateDistinctOrderStatusMessage
    
    //need function for yes, no and close button
    function yesButtonAction(event){
        event.preventDefault();
        props.invokeAction();
        props.invokeRefresh();
    }

    function noButtonAction(event){
        event.preventDefault();
        props.xButtonClose();
    }

    function closeButtonAction(event){
        event.preventDefault();
        
        props.closeButton();
        props.invokeRefresh();
        
    }


    return(
        <div className='generalConfirmationContainer'>
            {/* <label className='generalConfirmationHeader'>Are You Sure ?</label> */}
                <br></br>
                {!props.clickStatus ?  <div className='generalConfirmationHeaderContainer'> <label className='generalConfirmationHeader'>Are You Sure ?</label>
                        <div className='generalConfirmationButtonContainer'>
                            <button className='generalConfirmationYesButton' onClick={yesButtonAction}>Yes</button>
                            <button className='generalConfirmationNoButton' onClick={noButtonAction}>No</button>
                        </div>
                    </div>:<div> <label className='generalConfirmationHeaderStatus'>Transaction Status</label>
                        <div>
                            <div className='generalConfirmationStatusMessageContainer'><label className='generalConfirmationStatusMessage'>{props.statusMessage}</label></div>
                            <button type="button" className='generalConfirmationCloseButton'  onClick={closeButtonAction} >Close</button>
                        </div>
                    </div>
                }
                <br></br>
                {/* {props.clickStatus ? <div className='generalConfirmationStatusMessageContainer'><label className='generalConfirmationStatusMessage'>{props.statusMessage}</label></div>: null} */}
                
        </div>
    );
}


export default ConfirmationPopupContents;


