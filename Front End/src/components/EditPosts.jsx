import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UploadImage from "./DragDrop";
import DragDrop from "./DragDrop";
import { API_URL } from "../constants/api";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const {id} = useParams();
  const history = useHistory();

  useEffect(()=> {
    getPostById()
  }, []);
  const getPostById = async() => {
    const response = await Axios.get(`http://localhost:3300/posts/${id}`);
    setTitle(response.data.caption);
    setFile(response.data.image);
    setPreview(response.data.url);
  }

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

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("username", username);
    try {
      await Axios.patch(`http://localhost:3300/posts/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      history.push("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex flex-row justify-content-center mt-3">
          <div className="d-flex flex-column m-2">
            <h1>Edit Post</h1>
            <input type="file" onChange={loadImage} />
            {preview ? (
              <figure>
                <img
                  src={preview}
                  alt="Preview Image"
                  width="300"
                  height="200"
                />
              </figure>
            ) : (
              ""
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Input Caption Here"
              className="mt-3"
            />
            <button onClick={updatePost} className="mt-3">
              Edit Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
