import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import SignUpPage from "views/LoginPage/SignUp.js";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/profile-page/:id" render={(props) => <ProfilePage {...props} id={props.match.params.id}/>}/>
      <Route path="/login-page" component={LoginPage} />
      <Route path="/sign-up-page" component={SignUpPage} />
      <Route path="/:customerId" render={(props) => <LandingPage {...props} customerId={props.match.params.customerId}/>}/>
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
