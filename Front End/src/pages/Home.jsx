import React from "react";
import video from "../files/intervideo.mp4";
import image from '../files/ScrolltimeLogo.png';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <>
        {/* <nav style={{ backgroundColor: "#F9F9F9" }} className="py-3">
          <div className="container justify-content-between d-flex flex-row">
            <div>
              <img src={image} style={{ width: "100px", height: "100px" }} />
            </div>
            <div>
              <Link to="/signin">
                <button type="button" className="btn-signin">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn-signup">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </nav> */}

        {/* Jumbotron */}
        <div>
          <video id="background-video" width={"100%"} autoPlay loop muted preload="auto">
            <source src={video} type="video/mp4" />
          </video>
          <p
            style={{ marginTop: "400px", marginLeft: "100px", width: "700px" }}
            className="container slogan-word"
          >
            Connect with your loved ones
          </p>
        </div>
      </>
    );
  }
}

export default Home;
