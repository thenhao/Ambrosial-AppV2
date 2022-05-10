import {useState} from 'react';
import CustomButton from "./buttons/custom-button";
import capitalize from 'capitalize-the-first-letter';
import './menu-item-component.css';

function MenuItemComponent(props){
    
    const [itemCount, setItemCount] = useState(1);

    //minus function for subtracting the item quantity. For - button
    function minus(){
        if(itemCount > 1){
            const updatedCount = itemCount - 1;
            setItemCount(updatedCount);
        }

        console.log('button has been clicked in minus and itemcount is:', itemCount);
    }

    //plus function for adding the item quantity For + button
    function plus(){
        if(itemCount >= 0 && itemCount < 99){
            const updatedCount = itemCount + 1;
            setItemCount(updatedCount);
        }

        console.log('button has been clicked in plus and itemcount is:', itemCount);
    }

    //sendtoorder function is to send item to order list
    let itemDetails = {
        name:"",
        price:0,
        quantity:0
      };
    function sendtoorder(){
        //this should be inside the parent so that add button can access it
        //passed down from the parent till this child
        //put at the common parent of orderlist and menuitem
        const itemDetailsLink = {
            name:props.data.alt,
            price:props.data.price,
            quantity:itemCount
        }
        itemDetails = itemDetailsLink;
        props.addtocart(itemDetails);
    }

    //function to handle the keyboard input for the item
    //setting a minimum and maximum quantity to it
    function minmaxquantity(event){
        //reference:https://api.jquery.com/event.which/
        //reference:https://www.codegrepper.com/code-examples/html/allow+only+numbers+in+input+field+html
        //if not number return false and break out of the function
        //this is just to ensure 0 to 9 can be typed
        
        var charCode = (event.which) ? event.which : event.keyCode

        if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
        

        //parsing of the value as this is a string
        //condition to check the number has max quantity of 99 and min of 1
        const {value} = event.target;
        let parsedValue = parseInt(value);

        //reference:https://www.w3schools.com/jsref/jsref_isnan_number.asp#:~:text=The%20Number.,the%20type%20is%20a%20Number.
        if(Number.isNaN(parsedValue)){
            parsedValue = 0;
            setItemCount(parsedValue);
            
        }

        //setting a min and max quantity 
        if((parsedValue < 1)){
            event.target.value = 1;
        }else if((parsedValue > 99)){
            event.target.value = 99;
        }else{
            setItemCount(parsedValue);
        }

    }

    return(
            <div className="itemcomponent">
                 
                <div id="imagecontainer">
                    <img src={props.data.src} id="image" alt={props.data.alt}/>
                </div>

                 <div className="item-desc-container">
                     <label id="item-name">{capitalize(props.data.alt)}</label><br/>
                     <label id="item-price">${props.data.price}</label>
                 </div>
                
                <div className="quantity-container">
                        <CustomButton sign="-" click={minus}/>
                        <input className="menu-input" type="text" value={itemCount} onChange={minmaxquantity}></input>
                        <CustomButton sign="+" click={plus}/>
                </div>
                 
                 <button className='addbutton' onClick={sendtoorder}>Add</button>
            </div>
    )
}

export default MenuItemComponent;