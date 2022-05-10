import React from 'react';
import './update-and-delete-button.css';

function UpdateAndDeleteButton(props){

    function updateAction(e){
        e.preventDefault();
        props.setId(props.id);
        props.setData(props.data);
        props.setView(true);
    }

    return(
        <>
            <button className="updateAndDeleteDistinctOrderButton" onClick={updateAction}>{props.buttonText}</button>
        </>
    )
}

export default UpdateAndDeleteButton;


