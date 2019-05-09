import React,{Component} from 'react';
import Table from '../Common/table';
import Axios from "axios";
import { Button} from 'reactstrap';
import { connect } from 'react-redux';
import {getUsers,toggleActiveUser} from './../actions/user.actions';
class Admin extends Component {
   
    //    disableUser(user){
    //     Axios.put(`http://localhost:3001/users/${user.id}`,{
    //         "username":user.username,
    //         "password": user.password,
    //         "RoleId":user.RoleId,
    //         "IsDisable":true
    //     }).then((response) => {
    //         console.log(response);
    //         this.LoadUsers();
    //     }).catch(err => {
            
    //        // this.showErrorToaster();
    //         console.log(err);
    
    //     })
    // }
    
    //    enableUser(user){

    //       Axios.put(`http://localhost:3001/users/${user.id}`,{
    //         "username": user.username,
    //         "password": user.password,
    //         "RoleId":user.RoleId,
    //         "IsDisable":false
    //     }).then((response) => {
    //         this.LoadUsers();
    //         console.log(response);
    //     }).catch(err => {
    //         this.LoadUsers();
    //        // this.showErrorToaster();
    //         console.log(err);
    
    //     })
    //   }

    //   LoadUsers=()=>{
         
    //     Axios.get(`http://localhost:3001/users`)
    //     .then(res => {
    //       this.setState({
    //           records: res.data,
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //   }

    

      componentDidMount(){

        this.props.onGetUser();
      }
      
    render() {
      debugger;
     const UsersList=this.props.UsersList;

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
                    {row.original.IsDisable? <Button   onClick={
                        () => 
                        {
                          this.props.onToggleUser(row.original);
                                     
                       }
                    
                  } color="success">Enable</Button>: <Button  onClick={
                      () =>  {
                          this.props.onToggleUser(row.original);

                      }
                      } color="danger">Disable</Button>  } 
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
  debugger;
  const { UsersList } = state;
  return {
    UsersList
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