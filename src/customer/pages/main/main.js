import React from 'react';
import MenuItemContainer from '../../components/menu-item-container';

export default function Main(props) {

  return (
    <div>
      <MenuItemContainer className="maincontainer" itemData={props.data} addtocart={props.addtocart} type={props.type}/>
    </div>
  );
}