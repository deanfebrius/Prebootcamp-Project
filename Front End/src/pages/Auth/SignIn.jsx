import {React, useState} from "react";
import image from '../../files/ScrolltimeLogo.png';
import homeLogo from '../../files/HomeLogo.png';
import video from '../../files/intervideo.mp4';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {signInUser} from "../../redux/actions/user";
import {connect} from "react-redux";
import Axios from "axios";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
      e.preventDefault();
      try {
        await Axios.post("http://localhost:3300/signin", {
          email: email,
          password: password
        });
        history.push("/feed");
        window.location.reload();
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
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
            style={{ width: "380px", height: "450px" }}
          >
            <p className="scrolltime">Scrolltime</p>
            {msg ? <div className="alert alert-danger mx-4">{msg}</div> : null}
            <input
              name="username"
              type="text"
              placeholder="Username or email"
              style={{ height: "40px" }}
              className="text-box mx-4"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={{ height: "40px" }}
              className="mx-4 mt-3"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              onClick={Auth}
              style={{ height: "40px" }}
              className="mx-4 btn-login"
            >
              Sign In
            </button>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <div>
            <div
              className="card-insert container"
              style={{ width: "380px", height: "50px" }}
            >
              <p className="signup-link">
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign Up!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }


export default SignIn;