import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import DrawingSearch from "./components/search/DrawingSearch";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/drawingsearch" component={DrawingSearch} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
