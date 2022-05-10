import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import LandingApp from './landing-app';
import CustomerApp from './customer/customer-app';
import AdminApp from './admin/admin-app';

function App() {

  return (
    <>
    <Router>
        <Switch>  
          <Route exact path="/"><LandingApp /></Route>
          <Route path="/customer"><CustomerApp /></Route>
          <Route path="/admin"><AdminApp /></Route>
          <Redirect from ="*" to="/" />
        </Switch>
    </Router>
    </>
  )
}

export default App;