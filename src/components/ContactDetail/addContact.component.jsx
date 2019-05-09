import React,{Component} from 'react';
import { Form, Button, Input,FormFeedback,FormGroup,Col, Row} from 'reactstrap';
 import { connect } from 'react-redux';
 import {contactConstants} from '../_constants';
 import { addContact } from '../actions/contact.actions';


//addContact.component
class AddContact extends Component {
  constructor(props) {
    super(props);



    
    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeName = updateFieldEvent('name');
    this.changePhone = updateFieldEvent('phone');
    this.changeBody = updateFieldEvent('body');
    this.changeImage = updateFieldEvent('image');
    this.changeEmail = updateFieldEvent('email');


   
  }


    validate=()=>{
      let errors={};
      const {Contact}=this.props;
      if(Contact.name==="")errors.name="Customer Name cannot be blank!";
      if(Contact.phone==="")errors.phone="Phone cannot be blank!";
      if(Contact.email==="")errors.email="Email cannot be blank!";
      if(Contact.image==="")errors.image="Image Url cannot be blank!";
      return Object.keys(errors).length === 0 ? null : errors;
     //  return errors;
  }

     handleSubmit=(e)=>{
      e.preventDefault();
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;
      this.props.onAddContact(this.props.Contact);
    }


    render() { 
      const { Contact } = this.props;
      console.log(this.props.Contact);
      const {errors}=Contact;
        return ( 
       

          <React.Fragment>
            <Form onSubmit={this.handleSubmit}>
                <h1 className="btn btn-hero btn-lg btn btn-success">Add Contact</h1> 
                <Row form>
                <Col md={6}>
                <FormGroup>
              <Input type="text" value={this.props.Contact.name} invalid={errors.name?true:false}  autoComplete="off" onChange={(event)=>this.changeName(event)} name="name" id="exampleEmail" placeholder="Enter Customer Name" />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="number" value={this.props.Contact.phone} invalid={errors.phone?true:false}  autoComplete="off" onChange={(event)=>this.changePhone(event)}   name="phone" id="phone" placeholder="Enter Customer Phone Number" />
              <FormFeedback>{errors.phone}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup >
            <Input type="email" value={this.props.Contact.email} invalid={errors.email?true:false}  autoComplete="off" onChange={(event)=>this.changeEmail(event)}   name="email" id="email" placeholder="Enter Customer Email" />
            <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={6}>

            <FormGroup >
            <Input type="text" value={this.props.Contact.image} invalid={errors.image?true:false} autoComplete="off"  onChange={(event)=>this.changeImage(event)}  name="image" id="image" placeholder="Enter Image Url" />
            <FormFeedback>{errors.image}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={12}>
            <Button color="primary">Submit</Button>
            </Col>
            </Row>
          </Form>
</React.Fragment>

         );
    }
}
 
function mapStateToProps(state) {
  const { Contact } = state;
  return {
    Contact
  };
}

const mapDispatchToProps = dispatch => ({
    onAddContact: (contact) =>
    dispatch(addContact(contact.name,contact.phone,contact.email,contact.image,JSON.parse(localStorage.user)[0].id)), 
    onUpdateField: (key, value) =>  dispatch({ type: contactConstants.UPDATE_FIELD_EDITOR, key, value })
});

export default connect(mapStateToProps,mapDispatchToProps)(AddContact);