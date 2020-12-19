import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};

  //function handle menu item click
  onMenuItemclick(item) {
    this.setState = {
      currentItem: item
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="/movies">
            <span>Movies</span>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentels">
            Rentels
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;
