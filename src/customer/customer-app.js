import {ambrosialAxiosAPI} from '../api/api.js';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Home from './pages/home/home';
import Appetizer from './pages/appetizer/appetizer';
import Main from './pages/main/main';
import Beverage from './pages/beverage/beverage';
import Dessert from './pages/dessert/dessert';
import Footer from './parts/footer';
import Header from './parts/header';
import Payment from './parts/payment';
import Server from './parts/server';
import OrderList from './parts/order-list.js'
import AddedItem from './components/order-list-container.js';
import CategoryData from './components/category-data.js';
import './customer-app.css';
import './components/order-list-send-button.css';


function CustomerApp() {
  const [menu, setMenu] = useState([]);

  const getMenuAPI = async () => {
    const { status, data } = await ambrosialAxiosAPI.get('/findall-mi');
    console.log("Status", status);
     console.log("Data", data);
    if (status === 200) {
      setMenu(data.data);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    getMenuAPI();
  }, []);

  //default state for pass item to orderlist
  const defaultState = {
    name: "",
    price: 0,
    quantity: 0,
  };

  //state for storing the item to be passed to orderlist
  const [additem, setAddItem] = useState(defaultState);

  // to be printed as default on the order list
  const [selectedItemList, setSelectedItemList] = useState([]);

  //function to pass the item to the cart
  function AddItemToCart(itemobject) {
    const toCartObject = { ...itemobject };
    setAddItem(toCartObject);
    AddedItem(toCartObject, selectedItemList, setSelectedItemList); // function call to pass the obj to OrderlistContainer
  }

  //funtion to clear the additem so that it can be ready for the next item to pass
  function ClearAddItem() {
    setAddItem(defaultState);
    console.log("item has been added to cart");
  }

  useEffect(() => {
    console.log("additem is", additem);
  },[additem]);
  
  // state for storing the subpage status
  const [pageState, setPageState] = useState('');

  // responsive design
  const [show, setShow] = useState(false);
  const handleMenu = () => setShow(!show)

  return (
    <>
      <div className='background-opacity'>
        <div className='ingress'>
        <div>
          <span className='orderlist'><OrderList selectedItemList={selectedItemList} setSelectedItemList={setSelectedItemList}/></span>
          <span className='server'><Server /></span>
          <span className='payment'><Payment /></span>
        </div>
        <div className="header">
          <Header/>
        </div>
          <div className="toggleMenu" onClick={handleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div className='navbarcontainer'>
            <Router>
            <div className={show ? "navbar active" : "navbar"}>
                <Link to="/"><button onClick={()=> {setPageState("Home")}} className={pageState === "Home"? "selected-page" : "pages"}>Home</button></Link>
                <Link to="/pages/appetizer"><button onClick={()=> {setPageState("Appetizers")}} className={pageState === "Appetizers"? "selected-page" : "pages"}>Appetizers</button></Link>
                <Link to="/pages/main"><button onClick={()=> {setPageState("Mains")}} className={pageState === "Mains"? "selected-page" : "pages"}>Mains</button></Link>
                <Link to="/pages/beverage"><button onClick={()=> {setPageState("Beverages")}} className={pageState === "Beverages"? "selected-page" : "pages"}>Beverages</button></Link>
                <Link to="/pages/dessert"><button onClick={()=> {setPageState("Desserts")}} className={pageState === "Desserts"? "selected-page" : "pages"}>Desserts</button></Link>
              </div>
              <div className='menuitemcontainer'>
                <Switch>
                  <Route exact path="/"><Home /></Route>
                  <Route path="/pages/appetizer"><Appetizer data={menu} addtocart={AddItemToCart} type={CategoryData[0]}/></Route>
                  <Route path="/pages/main"><Main data={menu} addtocart={AddItemToCart} type={CategoryData[1]}/></Route>
                  <Route path="/pages/beverage"><Beverage data={menu} addtocart={AddItemToCart} type={CategoryData[2]}/></Route>
                  <Route path="/pages/dessert"><Dessert data={menu} addtocart={AddItemToCart} type={CategoryData[3]}/></Route>
                  <Redirect from ="*" to="/" />
                </Switch>
                
              </div>
            </Router>
              </div>
                <Footer/>
            </div>
          </div>
        </>
      );
    }

export default CustomerApp;