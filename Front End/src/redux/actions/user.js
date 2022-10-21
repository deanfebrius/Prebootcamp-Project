import Axios from "axios";
import {API_URL} from '../../constants/api'

export const signUpUser = ({ fullName, username, email, password }) => {
    return (dispatch) => {
        Axios.post(`http://localhost:3300/signup`, {
          fullName,
          username,
          email,
          password,
        })
          .then((result) => {
            delete result.data.password
            dispatch({
                type: "USER_LOGIN",
                payload: result.data
            })
            alert("Berhasil mendaftarkan user");
          })
          .catch(() => {
            alert("Gagal");
          });
    }
    
}

export const signInUser = ({username, password}) => {
  return (dispatch) => {
    Axios.get(`http://localhost3300/signin`, {
      params: {
        username,
      }
    })
    .then((result)=> {
      if(result.data.length) {
        if (password === result.data[0].password) {
          delete result.data[0].password;

          localStorage.setItem(
            "userDataEmmerce",
            JSON.stringify(result.data[0])
          );
          
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
        }
        else {
          // Handle error wrong password
            dispatch({
            type: "USER_ERROR",
            payload: "Wrong password!"
            })
        }
      }
      else {
        // Handle error username not found
        dispatch({
        type: "USER_ERROR",
        payload: "User not found!",
        });
      }
    })
    .catch(()=> {
      alert("Terjadi kesalahan")
    })
  }
}

export const userKeepSignIn = (userData) => {
  return (dispatch) => {
    Axios.get(`http://localhost:3300/signin`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };
};

export const signoutUser = () => {
  localStorage.removeItem("userDataEmmerce");
  return {
    type: "USER_LOGOUT",
  };
};