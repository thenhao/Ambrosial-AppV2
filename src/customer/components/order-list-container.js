function AddedItem(item, selectedItemList, setSelectedItemList) {
  let newSelectedItemList = [...selectedItemList];
  
  let result = newSelectedItemList.find(obj => {
    if(obj.name === item.name) {
      return true;
    }
    else {
      return false;
    }
  });
console.log('result is', result);
  if(result === undefined) {
    newSelectedItemList.push(item);
  }
  else {
    //edited code to ensure sum is added from menucomponent side
    result.quantity += item.quantity;
  }
  setSelectedItemList(newSelectedItemList);
}

export default AddedItem;

