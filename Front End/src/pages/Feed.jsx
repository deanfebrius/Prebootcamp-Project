import {React, useState, useEffect} from "react";
import image from "../files/Scrolltime.png";
import ImageHome from "../files/Home.png";
import ImageProfile from "../files/image.jpg";
import {signOutUser} from "../redux/actions/user"
import {UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Dropdown} from 'reactstrap';
import {connect} from "react-redux";
import Axios from "axios";
import {API_URL} from '../constants/api'
import jwt_decode from "jwt-decode";
import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";



const HomePage = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();

    useEffect(()=> {
      refreshToken()
    },[]);

    const refreshToken = async()=> {
      try {
        const response =  await Axios.get('http://localhost:3300/token');
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        console.log(decoded.username)
        setUsername(decoded.username);
        setExpire(decoded.exp);
      } catch(error) {
          if(error.response) {
            history.push("/")
          }
      }
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getPosts();
    }, []);

    const getPosts = async () => {
      const response = await Axios.get("http://localhost:3300/posts");
      setPosts(response.data);
    };

    const deletePost = async(postId) => {
      try {
        await Axios.delete(`http://localhost:3300/posts/${postId}`)
        getPosts()
      } catch(error) {
        console.log(error)
      }
    }
        return (
          <>
            <div
              className="row container justify-content-start"
              style={{ marginLeft: "100px" }}
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="card post-card col-4 mx-3 my-3"
                  style={{ width: "25rem" }}
                >
                  <img src={post.url} alt="Image" />
                  <div className="p-3">
                    <div className="d-flex flex-row justify-content-evenly col-3">
                      {/* love sign */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>

                      {/* comment sign */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chat"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                      </svg>

                      {/* share sign */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                      </svg>
                      {post.username === username ? (
                        <>
                          <Link to={`/editpost/${post.id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                          </Link>

                          <div onClick={() => deletePost(post.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="d-flex flex-row mt-2">
                      <p className="font-username">{post.username}</p>
                      <p className="mx-3">{post.caption}</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Type Comment Here"
                      className="mt-2 comment-text"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    }


export default HomePage;
