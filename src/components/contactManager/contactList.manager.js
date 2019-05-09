import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../Common/table';
import { Button} from 'reactstrap';
import { getContact,deleteContact } from '../actions/contact.actions';

class TaskList extends Component {

    componentDidMount() {
        this.props.getContact(this.props.authentication.user.id);
    }    
     
        
  
    render() {
      const headers=[
        {
          Header: () => (
            <div
              style={{
                textAlign:"left"
              }}
            >Name</div>),
            accessor: 'name'
          },
    
          {
            Header: () => (
              <div
                style={{
                  textAlign:"left"
                }}
              >Phone Number</div>),
              accessor: 'phone'
            },
    
            {
              Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Email</div>),
                accessor: 'email'
              },
              {
                Header: () => (
                  <div
                    style={{
                      textAlign:"left"
                    }}
                  >Image Url</div>),
                  accessor: 'image'
                },
         
        
        {
          Header: () => (
            <div
              style={{
                textAlign:"left"
              }}
            ></div>),
          Cell: row => (
              <div>
                  <Button  onClick={() => this.props.handleDelete(row.original)} color="danger">Delete</Button>
              </div>
          )
       }
        
    ];
        const { contacts } = this.props;
         
        return (
            <Table
            data={contacts}
            columns={headers}
            defaultPageSize={10}
            noRecordsText="No Contact found" />
        );
    }
}



function mapStateToProps(state) { //state = store.getState()
    debugger;
    return {
        contacts: state.Contact.records,
        authentication:state.authentication
    }
}

function mapDispatchToProps(dispatch) {
    debugger;
    return {

      getContact: (id) =>
      dispatch(getContact(id)),
        handleDelete:(row)=>{dispatch(deleteContact(row))}

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);




