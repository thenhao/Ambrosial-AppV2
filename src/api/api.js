import axios from 'axios';

const API = axios.create({
    baseURL:"https://my-json-server.typicode.com/Sarah-Specialist/menu-api",
});

//baseURL will change when there is a deployed backend
const ambrosialAxiosAPI = axios.create({
    // baseURL:'http://localhost:5000',
    baseURL:'https://ambrosial-server.herokuapp.com/'
  });

//export default API;
export {
    API,
    ambrosialAxiosAPI
}