import React,{Component} from 'react';
import { Form, Button, Input,FormFeedback,Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link,  } from 'react-router-dom';
import {authActions,userActions,signUp}  from '../actions';

import {authenticationConstants} from '../_constants'

class LoginForm extends Component {
    constructor(props)
    {
        super(props);
        this.props.onLogout();
        const updateFieldEvent =
        key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeName = updateFieldEvent('username');
      this.changePassword = updateFieldEvent('password');
        }

    validate=()=>{
        let errors={};
        const {username,password}=this.props.authentication;
        if(username==="")errors.username="UserName cannot be blank!";
        if(password==="")errors.password="Password cannot be blank!";

        return Object.keys(errors).length === 0 ? null : errors;
       //  return errors;
    }


     handleSubmit=(e)=>{
        e.preventDefault();
        const errors = this.validate();
        this.props.onValidationDone(errors);
      if (errors) return;
    this.props.onLogin(this.props.authentication.username,this.props.authentication.password);
    }
     
    render()
        { 
            const { username,password,errors,IsValidCrendentials,ErrorMessage } = this.props.authentication;    
        return ( <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Sign In</h3>
                    <div className="d-flex justify-content-end social_icon">
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-google-plus-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div className="card-body">
                <Form onSubmit={this.handleSubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="username" name="username" placeholder="UserName" onChange={(event)=>this.changeName(event)}  invalid={errors.username?true:false} value={username}/>
                            <FormFeedback>{errors.username}</FormFeedback>
           
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <Input type="password" id="password" name="password" placeholder="Password" onChange={(event)=>this.changePassword(event)} invalid={errors.password?true:false} value={password}/>
                            <FormFeedback >{errors.password}</FormFeedback>
           
                        </div>

                        <div>
                        {!IsValidCrendentials &&   <Alert color="danger">
                        {ErrorMessage}
                 </Alert> } </div>


                       
                        <div className="form-group">
                        <Button className="btn float-right login_btn" color="primary">Login</Button>

                        </div>
                        </Form> 
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                    Don't have an account? <Link to="/SignUp">Sign Up</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="JavaScript:Void(0);">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div> );
    }
}
 
function mapDispatchToProps(dispatch) {
    return {
        onLogout: () =>
    dispatch(userActions.logout()),
    onValidationDone:(errors)=>dispatch(authActions.dispatchError(errors)),
    onLogin:(username,password)=>dispatch(userActions.login(username,password)),
    onUpdateField: (key, value) =>  dispatch({ type: authenticationConstants.UPDATE_FIELD_EDITOR, key, value }),
    signUp:()=>dispatch(userActions.signUp())
    }
}
  

function mapStateToProps(state) {
    const { authentication } = state;;
    return {
        authentication
    };
}


  export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);

