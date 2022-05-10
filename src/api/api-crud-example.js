const ambrosialAxiosAPI = require("./api");

/* ********************************************************************************Reminder********************************************************************************
Ensure that your backend is running before running your front end and testing your axios call
*/


/* 
This is an example of CRUD which allows you to get, put, post and delete. This will help you to get by for now

This allows you to access the endpoints that were defined by you in your express middleware and retrieve the data from the database

I have written this as an Immediately Invoked Function Expression(IIFE) due to testing purposes so take the parts needed and use them inside your own components and pages

The console.log that is used inside the response and errors shows the common data needed as well as the data we are returning from our service after the db query.

example:
Everytime i click the receipts tab in the admin page i would need to retrieve information from the backend

You can put it in a function where you can use it to call for the data
or 
Depending on your design you can put the axios call inside an useEffect


********************example of putting it inside a useEffect**************************************

***Note: this only calls the function when component is first mounted***

 useEffect(() => {
         getReceiptData();
    },[]);

function getReceiptData(){
   await ambrosialAxiosAPI.get('/receipts')
   .then((response) => {
         if(response.data.status === 200){
            
           *****set data/store data/handle data*****
         }
       })
    .catch((error) => {
      
        *****handle errors here********
     });
}
*/

(async ()=>{
    
    /*GET METHOD */
    await ambrosialAxiosAPI.get('/vieworderitems')
    .then((response) => {
         console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         //Not in template literal as it will only show the type object
         console.log("response Data: ", response.data.data);
       })
    .catch((error) => {
       console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
       console.log(`Error Status: ${error.response.data.status}`);
       console.log(`Error Message: ${error.response.data.message}`);
     });
    

    /*POST METHOD */
    await ambrosialAxiosAPI.post('/register', {
        username: 'haoTest2',
        password: 'testpassword2'
    })
    .then((response) => {
         console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
      })
    .catch((error) => {
        console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
      });

    /*PUT METHOD */
    //Mocking a receipt id
    const receiptID = 1;
    await ambrosialAxiosAPI.put(`/updatereceipt/${receiptID}`, {    
        orderNoId: 1,
        totalPrice: 61.23
    })
    .then((response) => {
         console.log(`${response.config.method} method for route: ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
    })
    .catch((error) => {
        console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
    });

    /*DELETE METHOD */
    //Mocking an id for a single item
    const menuitemId = 5;
    await ambrosialAxiosAPI.delete(`/delete-mi/${menuitemId}`)
    .then((response) => {
         console.log(`${response.config.method} method for route: ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
    })
    .catch((error) => {
        console.log(error);
        console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
    });

})();