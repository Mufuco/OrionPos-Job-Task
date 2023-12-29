import { jwtDecode } from 'jwt-decode';
const userService = {
     getUserId() {
        let jwtUserData='';
        const userToken = sessionStorage.getItem('token') || localStorage.getItem('token');
        if(userToken){
           jwtUserData = jwtDecode(userToken);
           return jwtUserData.id;
        }
        else{
            window.location.href = '/';  
            return false;
        }
    },
  
  };
  
  
  export default userService;
  