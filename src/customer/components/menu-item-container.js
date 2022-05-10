import MenuItemComponent from "./menu-item-component.js";
import './menu-item-container.css';

function MenuItemContainer(props){
    //reference for filter:https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples
    return(
        <div className="displaycontainer">
            {props.itemData.filter(item=>item.type === props.type).map((element)=>{
                return <MenuItemComponent id={element.id} data={element} addtocart={props.addtocart}/>;
            })}
        </div> 
    )
}

export default MenuItemContainer;