import React, { Component } from "react";
import Identicon from "identicon.js";

class Labtest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testname: "",
      address: "",
      results: "",
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const testname = this.state.testname;
    const address = this.state.address;
    const results = this.state.results;

    this.props.newLab(testname, address, results);
    console.log("you have inserted data" + testname, address, results);
  };

  render() {
    return (
      <div className="container-fluid mt-5 col-lg-6">
        <form onSubmit={this.handleSubmit} className="inputForm">
          <div className="form-group">
            <label for="testnameforinsert">Lab Results</label>
            <input
              name="testname"
              value={this.state.testname}
              type="text"
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              placeholder="Test Name"
            />
          </div>
          <div className="form-group">
            <label for="address options">Address</label>
            <select
              required
              name="address"
              className="form-control"
              value={this.state.address}
              onChange={(e) => this.handleChange(e)}
            >
              <option value="0xc9C204093914099A788fC3C8f84bF2FbDC860C98">
                0xc9C204093914099A788fC3C8f84bF2FbDC860C98
              </option>
              <option>0x49387FBe1aa8014E74d8842e5cE8F4520d8c14AE</option>;
              <option>0xa1902b173AaC8a030dB611dC64E8d3492155573C</option>;
              <option>0x0D1ec6A2816e2704aDBefED4623E0D8F9B54Aba7</option>;
              <option>0xF33d37420681DD5F4A22fe7bf48C321F449D401F</option>;
              <option>0x32429F4593290c87398862eFE4CF625137bD4718</option>;
              <option>0xAc2705FdB899D8e0A0098C1527FB6a45D016BD1C</option>;
              <option>0x78FCe8768b6e9b36D12a6EE3255e634c0cfa22Be</option>;
              <option>0x6d30650c280A04317eaFEdEdeF93e6537C350214</option>;
              <option>0x0a4a0Dfb0FA3B1D730aB7Ee3A8DecE5b9844714B</option>;
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Test Results</label>
            <input
              name="results"
              type="text"
              value={this.state.results}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              placeholder="Test Results"
            />
            <small id="date time" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <p>&nbsp;</p>
        {this.props.labs.map((lab, key) => {
          return (
            <div className="card mb-4" key={key}>
              <div className="card-header">
                <img
                  alt="img"
                  className="mr-2"
                  width="30"
                  height="30"
                  src={`data:image/png;base64,${new Identicon(
                    lab.patient,
                    30
                  ).toString()}`}
                />
                <small className="text-muted">{lab.patient}</small>
              </div>
              <ul id="postList" className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>{lab.testname}</p>
                </li>
                <li key={key} className="list-group-item py-2">
                  <small className="float-right mt-1 text-muted">
                    Result: {lab.results}
                  </small>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Labtest;
