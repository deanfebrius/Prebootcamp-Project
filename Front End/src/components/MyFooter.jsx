import React from "react";
import {Link} from 'react-router-dom';

class MyFooter extends React.Component {

    render() {
        return (
          <footer
            style={{ backgroundColor: "#F9F9F9" }}
            className="py-3 footer-margin"
          >
            <div className="d-flex flex-row container justify-content-center">
              <Link to="/" style={{textDecoration:"none"}}>
                <p className="footer-word-style">Home</p>
              </Link>

              <a href="#" className="footer-word-style">
                About
              </a>
              <a href="#" className="footer-word-style">
                Why Scrolltime?
              </a>
              <a href="#" className="footer-word-style">
                Privacy
              </a>
              <a href="#" className="footer-word-style">
                Terms
              </a>
            </div>
            <div className="copyright-word">&copy; 2022 Scrolltime</div>
          </footer>
        );
    }
}

export default MyFooter;