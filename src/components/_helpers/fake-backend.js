// array in local storage for registered users

import Axios from 'axios';
let users = JSON.parse(localStorage.getItem('users')) || [];
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (username, password) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
           
                let user=[];
                Axios.get("http://localhost:3000/users").then((response) => {
                        console.log(response);
                        user = response.data.filter(item=>item.username===username && 
                            item.password===password);    
                    if(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable){
                     //   const { from } =  { from: { pathname: "/" } };   
                        localStorage.setItem('user', JSON.stringify(user));
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(user)) });
                        }
                    else if(user.length>0 && user[0].RoleId===1 && !user[0].IsDisable){
                        //const { from } =  { from: { pathname: "/UserList" } };   
                        localStorage.setItem('user', JSON.stringify(user));
                       // window.location=from.pathname;
                       resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(user)) });
                    }
                  
                        else
                        {            
                            console.log('Invalid Crendentials');
                            reject('Invalid Crendentials');
                        }
                        console.log(response);
                    }).catch(err => {
                        console.log(err);
                        reject(err);
                       // this.showErrorToaster();
                        
            
                    })
                

            }, 500);
        });
    }
}