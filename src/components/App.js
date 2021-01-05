import React, { Component } from "react";
import Web3 from "web3";
import EHRec from "../abis/ElecHCare.json";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Symptoms from "./Symptoms";
import Labtest from "./Labtest";
import Imagings from "./Imagings";

import Home from "./Home";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ allaccounts: accounts });
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = EHRec.networks[networkId];
    if (networkData) {
      const ehRec = web3.eth.Contract(EHRec.abi, networkData.address);
      this.setState({ ehRec });
      const sympCount = await ehRec.methods.sympCounter().call();
      const labCount = await ehRec.methods.labCounter().call();
      const imageCount = await ehRec.methods.imageCounter().call();

      this.setState({ sympCount });
      this.setState({ labCount });
      this.setState({ imageCount });
      // Load Symptoms
      for (var i = 1; i <= sympCount; i++) {
        const symptom = await ehRec.methods.symptoms(i).call();
        this.setState({
          symptoms: [...this.state.symptoms, symptom],
        });
      }
      // for lab results
      for (var j = 1; j <= labCount; j++) {
        const lab = await ehRec.methods.labtests(j).call();
        this.setState({
          labs: [...this.state.labs, lab],
        });
      }
      //for Image results
      for (var k = 1; k <= imageCount; k++) {
        const Image = await ehRec.methods.imagings(k).call();
        this.setState({
          images: [...this.state.images, Image],
        });
      }

      this.setState({ loading: false });
    } else {
      window.alert("EHR contract not deployed to detected network.");
    }
  }

  newSymptom = (symptom, address, timeStamp) => {
    this.setState({ loading: true });
    this.state.ehRec.methods
      .newSymptom(symptom, address, timeStamp)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  };

  newLab = (testname, address, results) => {
    this.setState({ loading: true });
    this.state.ehRec.methods
      .newLabtest(testname, address, results)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  };

  newImage = (uhash, address) => {
    this.setState({ loading: true });
    console.log("Submitting file to ipfs...");
    ipfs.add(uhash, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }
      this.state.ehRec.methods
        .newImaging(result[0].hash, address)
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          this.setState({ loading: false });
        });
      console.log("hash2: " + result[0].hash);
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      allaccounts: [],
      ehRec: null,
      sympCount: 0,
      labCount: 0,
      imageCount: 0,
      symptoms: [],
      labs: [],
      images: [],
      loading: true,
    };
  }

  render() {
    return (
      <div>
        <Router>
          <Nav accInfo={this.state.account} />
          <Route path="/" exact component={Home} />
          <Route
            path="/symptoms"
            render={() => {
              return (
                <Symptoms
                  newSymptom={this.newSymptom}
                  symptoms={this.state.symptoms}
                />
              );
            }}
          />
          <Route
            path="/lab"
            render={() => {
              return <Labtest newLab={this.newLab} labs={this.state.labs} />;
            }}
          />
          <Route
            path="/imaging"
            render={() => {
              return (
                <Imagings newImage={this.newImage} images={this.state.images} />
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

export default App;
