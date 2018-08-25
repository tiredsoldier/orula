import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import Help from "../Help/Help";
import MyProfile from "../../components/MyProfile/MyProfile";
import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Courses from "../Courses/Courses";
import AddOrganisation from "../Admin/AddOrganisation/AddOrganisation";
import AddCourse from "../Courses/AddCourse/AddCourse";
import EditCourse from "../Courses/EditCourse/EditCourse";
import Nav from "../../components/Nav/Nav";
import Organisations from "../Admin/Organisations/Organisations";
import axios from "axios";

class App extends Component {
  componentDidMount = async () => {
    // get token from local storage
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // if there is no token redirect to login page
    if (!token) {
      return this.props.history.push("/login");
    }
  };

  render() {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;
    return (
      <Router>
        <div id="wrapper">
          <Nav />
          <div id="page-wrapper">
            <Route exact path="/" component={Home} />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/courses" component={Courses} />
            <Route
              exact
              path="/admin/organisations"
              component={Organisations}
            />
            <Route
              path="/admin/organisations/add"
              component={AddOrganisation}
            />
            <Route exact path="/admin/courses/add" component={AddCourse} />
            <Route
              exact
              path="/admin/courses/edit/:courseId"
              component={EditCourse}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
