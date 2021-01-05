import React, { Component } from "react";
import Icon from "../MOHlogo.png";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className=" container-fluid mt-5 col-lg-6">
          <img className="col-lg-4" src={Icon} />
          <h1>WELCOME TO MOH EHR BLOCKCHAIN BASED SYSTEM</h1>
          <ul>
            <li>Interoperable</li>
            <li>Secure</li>
            <li>Immutable</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
