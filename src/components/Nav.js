import React, { Component } from "react";
import Identicon from "identicon.js";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          EHR ETHIOPIA
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/symptoms">
                SYMPTOMS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/lab">
                LAB TESTS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/imaging">
                IMAGING
              </a>
            </li>
          </ul>
          <span className="nav-item">
            <small className="text-secondary">
              <small id="account">{this.props.accInfo}</small>
            </small>
            {this.props.accInfo ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                alt="xoxo"
                src={`data:image/png;base64,${new Identicon(
                  this.props.accInfo,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}
          </span>
        </div>
        <div></div>
      </nav>
    );
  }
}

export default Nav;
