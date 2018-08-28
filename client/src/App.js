import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./functions/PrivateRoute";
import LoggedIn from "./functions/LoggedIn";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import DrawingSearch from "./components/search/DrawingSearch";

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
};

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       loggedIn ? <Component {...props} /> : <Redirect to="/" />
//     }
//   />
// );

class App extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      //isLoggedIn: true
    };

    //this.loggedIn = this.loggedIn.bind(this);
    //this.requireAuth = this.requireAuth.bind(this);
  }

  // loggedIn() {
  //   return true;
  // }

  // requireAuth(replace) {
  //   if (!this.state.loggedIn) {
  //     replace({
  //       pathname: "/"
  //     });
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Login} />
              {/* <Route
              exact
              path="/drawingsearch"
              component={DrawingSearch}
              onEnter={this.requireAuth}
            /> */}
              <PrivateRoute
                exact
                path="/drawingsearch"
                component={DrawingSearch}
                isLoggedIn={LoggedIn()}
              />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
