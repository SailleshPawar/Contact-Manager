import React,{Component} from 'react';
import { Form, Button,CustomInput, Input,FormFeedback,Alert,FormGroup,Label , Col, Row} from 'reactstrap';
import Axios from "axios";
import { connect } from 'react-redux';
import {authenticationConstants} from '../_constants'
import {userActions}  from '../actions';
class SignUp extends Component {
    constructor(props)
    {
        super(props);

         const updateFieldEvent =
        key => ev => this.props.onUpdateField(key, ev.target.value);
      this.changeUserName = updateFieldEvent('username');
      this.changePassword = updateFieldEvent('password');
      this.changeConfirmPassword = updateFieldEvent('confirmPassword');
    }
      validate=()=>{
        let errors={};
        const {user}=this.props;
        if(user.username==="")errors.username="UserName cannot be blank!";
        if(user.password==="")errors.password="Password cannot be blank!";
        if(user.confirmPassword==="")errors.confirmPassword="Confirm Password cannot be blank!";
        if(user.confirmPassword!==user.password)errors.password="Password doesn't match!";
        return Object.keys(errors).length === 0 ? null : errors;
    }


    toggleRole=(e)=>{
     this.props.onRoleToggle(this.props.user.RoleId);

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
         this.props.onValidate(errors);
        if (errors) return;
        this.props.onRegister(this.props.user);       
    }

    

    render() { 
        const {user}=this.props;
        return ( 
        
          
            <Form onSubmit={this.handleSubmit}> 
          <div id="legend">
            <legend className="">Register</legend>
          </div>
          <div className="control-group">
   
          <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="username" value={user.username} onChange={(event)=>this.changeUserName(event)}  name="username" invalid={user.errors.username?true:false} placeholder="Username"  />
                            <FormFeedback>{user.errors.username}</FormFeedback>
                        </div>          
          </div>
       
          <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="password" value={user.password}  type="password" onChange={(event)=>this.changePassword(event)} invalid={user.errors.password?true:false} name="password" placeholder="Password"  />
                            <FormFeedback>{user.errors.password}</FormFeedback>
                        </div> 
      
       
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <Input id="confirmpassword" value={user.confirmPassword} type="password" onChange={(event)=>this.changeConfirmPassword(event)} invalid={user.errors.confirmPassword?true:false} name="confirmPassword" placeholder="Confirm Password"  />
                            <FormFeedback>{user.errors.confirmPassword}</FormFeedback>
                        </div> 
        <div className="input-group form-group">
               <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-user">Role    </i></span> 
           </div>            
            <CustomInput type="switch" className="toggle" id="exampleCustomSwitch" onChange={this.toggleRole} name="roleid" label="Administrator" />
         
      </div>


          <div className="control-group">
           
            <div className="controls">
              <button className="btn btn-success">Register</button>
            </div>
          </div>
      </Form>
     );
    }
}
 function mapDispatchToProps(dispatch) {
    return {
    onRoleToggle:(value)=>dispatch({
                  type: "ROLE_CHANGED",
                  RoleId: value
    }),
        onValidate:(errors)=>dispatch({
                 type: "SIGNUP_VALIDATIONSTATE",
                 errors: errors
             }),
        onRegister:(user)=>dispatch(userActions.register(user)),
        onUpdateField: (key, value) =>  dispatch({ type: "SIGNUP_UPDATE_FIELD_EDITOR", key, value }),
     }
}
  

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

  export default connect(mapStateToProps,mapDispatchToProps)(SignUp);

