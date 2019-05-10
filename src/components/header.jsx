import React,{Component} from 'react';
import { Link,  } from 'react-router-dom';
import { Navbar,NavbarBrand,Collapse,Nav,NavItem} from 'reactstrap';
import { connect } from 'react-redux';
 class  headerComponent extends Component { 

  render(){
debugger;
    const {authentication}=this.props;
   return ( 
   <div className="carousel fade-carousel slide" data-ride="carousel" data-interval="4000" id="bs-carousel"> 
   <div className="overlay">
   <Navbar color="light" light expand="md">
    <NavbarBrand href="/">Contact Manager</NavbarBrand>
    <Collapse navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
{
  authentication.loggedIn  && 
<Link to="/login">Logout</Link>
}
        </NavItem>
        
  <NavItem>
{
  !authentication.loggedIn  && 
<Link to="/login">Login</Link>
}
        </NavItem>
        

        <NavItem>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </NavItem>

        <NavItem>
{
  authentication.loggedIn &&  authentication.user.username
}
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
   </div>
   <ol className="carousel-indicators">
     <li data-target="#bs-carousel" data-slide-to="0" className="active"></li>
     <li data-target="#bs-carousel" data-slide-to="1"></li>
     <li data-target="#bs-carousel" data-slide-to="2"></li>
   </ol>
   
    
      
 </div> 
   )
}
 }

 function mapStateToProps(state) { //state = store.getState()
  return {
      
      authentication: state.authentication
  }
}

export default connect(mapStateToProps, null)(headerComponent);
 