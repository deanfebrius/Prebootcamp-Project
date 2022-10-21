import {React, useState, useEffect} from "react";
import {Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signoutUser} from '../redux/actions/user';
import image from '../files/Scrolltime.png';
import ImageProfile from "../files/image.jpg";
import {withRouter} from 'react-router';
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";



const MyNavbar = () => {
  const [username, setUsername] = useState("");
      const [token, setToken] = useState("");
      const [expire, setExpire] = useState("");
      const history = useHistory();

      useEffect(() => {
        refreshToken();
      }, []);

      const refreshToken = async () => {
        try {
          const response = await Axios.get("http://localhost:3300/token");
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          console.log(decoded.username);
          setUsername(decoded.username);
          setExpire(decoded.exp);
        } catch (error) {
          if (error.response) {
            history.push("/");
          }
        }
      };
    
        const SignOut = async() => {
          try {
            await Axios.delete('http://localhost:3300/signout');
            history.push("/");
            window.location.reload();
          } catch(error) {
            console.log(error)
          }
        }

        function refreshPage() {
          window.location.reload(false);
        }

        return (
          <div>
            <Navbar style={{ backgroundColor: "#F9F9F9" }} className="py-3">
              <div className="container">
                <NavbarBrand>
                  <Link to="/">
                    <img
                      src={image}
                      style={{
                        width: "150px",
                        height: "30px",
                        marginTop: "10px",
                      }}
                    />
                  </Link>
                </NavbarBrand>
                <Nav>
                  {username  ? (
                    <NavItem>
                      <div style={{ display: "flex" }}>
                        <Link to="/feed" className="pt-2">
                          <button type="button" className="home-image">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-house"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                              />
                            </svg>
                          </button>
                        </Link>

                        <Link to="/addpost" className="pt-2">
                          <button type="button" className="add-post">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-plus-square-dotted"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                          </button>
                        </Link>

                        <UncontrolledDropdown>
                          <DropdownToggle
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <img
                              src={ImageProfile}
                              className="profile-picture"
                            />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>
                              <Link to="/profile">Profile</Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link onClick={SignOut} style={{ textDecoration: "none" }}>
                                Sign Out
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </NavItem>
                  ) : (
                    <>
                      <NavItem>
                        <Link to="/signin">
                          <button type="button" className="btn-signin">
                            Sign In
                          </button>
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/signup">
                          <button type="button" className="btn-signup">
                            Sign Up
                          </button>
                        </Link>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </div>
            </Navbar>
          </div>
        );
    }

    const mapStateToProps = () => {
      return {

      }
    }

export default MyNavbar;