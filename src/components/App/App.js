import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 import './App.css';
import FooterComponent from '../footer';
import HeaderComponent from '../header';
import  LoginForm from '../Login/LoginPage';
import SignUp from '../Register/signUp.jsx';
import { Router, Route } from 'react-router-dom';
import ContactManager from '../contactManager/contactManager.component';
import { PrivateRoute } from '../_components';
import UserList from '../Admin/userList.component';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../actions';

  class App extends Component {
    constructor(props) {
      super(props);

      // const { dispatch } = this.props;
      // history.listen((location, action) => {
      //     // clear alert on location change
      //     dispatch(alertActions.clear());
      // });
    }
    render(){
  return (
    <div className="container">
     
     <Router history={history}>
      <HeaderComponent  />
                      
                            <div>
                              <PrivateRoute exact path="/" component={ContactManager} />
                                <PrivateRoute exact path="/UserList" component={UserList} />                      
                                

                                <Route exact path="/SignUp" component={SignUp} />
                               <Route path="/login"  component={LoginForm} />
                                
                            </div>
     
      <FooterComponent/>
                        </Router>
     
    </div>
  );
}
  }
  function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
// export default App;
