import {React, useState} from "react";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {API_URL} from '../../constants/api'
import {signUpUser} from '../../redux/actions/user'
import {connect} from 'react-redux';
import image from "../../files/ScrolltimeLogo.png";
import homeLogo from "../../files/HomeLogo.png";
import video from "../../files/intervideo.mp4";
import {useHistory} from 'react-router-dom';

const SignUp = () => {

      const [fullName, setFullName] = useState("");
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confPassword, setConfPassword] = useState("");
      const [msg, setMsg] = useState("");
      const history = useHistory();

      const SignUp = async(e) => {
        e.preventDefault();
        try {
          await Axios.post('http://localhost:3300/users', {
            fullName: fullName,
            username: username,
            email:email,
            password:password,
            confPassword: confPassword
          });
          history.push("/signin");
        } catch(error) {
            if(error.response) {
              setMsg(error.response.data.msg);
            }
        }
      }
    return (
      <>
        <video
          id="background-video"
          width={"100%"}
          autoPlay
          loop
          muted
          preload="auto"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div>
          <div
            className="card-insert container d-flex flex-column pt-5"
            style={{ width: "380px", height: "550px" }}
          >
            <p className="scrolltime">Scrolltime</p>
            {msg ? (
              <div className="alert alert-danger mx-4">
              {msg}
            </div>
            ) : null}
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              style={{ height: "40px" }}
              className="signup-text mx-4"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              style={{ height: "40px" }}
              className="signup-text mx-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              style={{ height: "40px" }}
              className="signup-text mx-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={{ height: "40px" }}
              className="mx-4 mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Confirm Password"
              style={{ height: "40px" }}
              className="mx-4 mt-3"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <button
              onClick={SignUp}
              style={{ height: "40px" }}
              className="mx-4 btn-login"
            >
              Sign Up
            </button>
          </div>
        </div>
      </>
    );
  }


export default SignUp;
