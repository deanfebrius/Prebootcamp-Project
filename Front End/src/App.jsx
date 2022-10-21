import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './pages/Home';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import MyNavbar from './components/MyNavbar';
import SignIn from './pages/Auth/SignIn';
import MyFooter from './components/MyFooter';
import SignUp from './pages/Auth/SignUp';
import Feed from './pages/Feed';
import {connect} from "react-redux";
import {userKeepSignIn, checkStorage} from "./redux/actions/user"
import AddPost from './pages/AddPost';
import Profile from './pages/Profile';
import EditPost from './components/EditPosts';
import EditProfile from './pages/EditProfile';




class App extends React.Component {

  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepSignIn(userData);

    }
  }

  render() {

      return (
        <BrowserRouter>
          <MyNavbar />
          <Switch>
            <Route component={Profile} path="/profile" />
            <Route component={EditPost} path="/editpost/:id" />
            <Route component={EditProfile} path="/editprofile/:id" />
            <Route component={AddPost} path="/addpost" />
            <Route component={SignIn} path="/signin" />
            <Route component={SignUp} path="/signup" />
            <Route component={Feed} path="/feed" />
            <Route component={Home} path="/" />
          </Switch>
          <MyFooter />
        </BrowserRouter>
      );

    
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = {
  userKeepSignIn,
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
