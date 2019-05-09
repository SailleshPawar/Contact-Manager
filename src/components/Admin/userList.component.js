import React,{Component} from 'react';
import Table from '../Common/table';
import Axios from "axios";
import { Button} from 'reactstrap';
import { connect } from 'react-redux';
import {getUsers,toggleActiveUser} from './../actions/user.actions';
class Admin extends Component {
   
    
      componentDidMount(){

        this.props.onGetUser();
      }
      
    render() {
     const {UsersList,authentication}=this.props;

      const headers=[
        {
          Header: () => (
            <div
              style={{
                textAlign:"left"
              }}
            >User Name</div>),
            accessor: 'username'
          },

          {
            Header: () => (
                
              <div
                style={{
                  textAlign:"left"
                }}
              >Role Name</div>
              ),

              Cell: row => (
                  <div>
                    {row.original.RoleId===1?"Administrator":"User"} 
                  </div>
              )
            
            
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
                    
                    {
                      row.original.IsDisable && row.original.username!==authentication.username? <Button   onClick={
                        () => 
                        {
                          this.props.onToggleUser(row.original);
                                     
                       }
                    
                  } color="success">Enable</Button>: 
                  
                  
                  row.original.username!==authentication.username?
                  
                  <Button  onClick={
                      () =>  {
                          this.props.onToggleUser(row.original);

                      }
                      } color="danger">Disable</Button>
                  :""      } 
                  </div>
              )
           }
        
    ];
        return ( 
            <React.Fragment>
     <h1>User List</h1>
     <Table
     data={UsersList[0]}
     columns={headers}
     defaultPageSize={10}
     noRecordsText="No User found"
             />
   </React.Fragment>
         );
    }
}
 

 
function mapStateToProps(state) {
  const { UsersList,authentication } = state;
  return {
    UsersList,
    authentication
  };
}

 const mapDispatchToProps = dispatch => ({
     onGetUser: () =>
    dispatch(getUsers()), 
    onToggleUser:(user)=>dispatch(toggleActiveUser(user))

     //onUpdateField: (key, value) =>  dispatch({ type: contactConstants.UPDATE_FIELD_EDITOR, key, value })
 });

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
// export default Admin;