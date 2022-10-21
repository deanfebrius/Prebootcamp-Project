import React from "react";

class ProfileCard extends React.Component {
  render() {
    return (
      <div
        className="card post-card col-4 mx-3 my-3"
        style={{ width: "25rem" }}
      >
        <img src={this.props.postData.postImage} alt="" />
      </div>
    );
  }
}

export default ProfileCard;
