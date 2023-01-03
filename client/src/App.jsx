import { Component } from "react";
import Web3 from "web3";
import SolidityDrive from "./contract_build/SolidityDrive.json";
import "./App.css";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
//import { defaultStyles } from "react-file-icon";
import { FcDocument } from "react-icons/fc";
import fileReaderPullStream from "pull-file-reader";
import { Table } from "reactstrap";
import ipfs from "./utils/ipfs";
const cors = require("cors");
class App extends Component {
  state = {
    solidityDrive: [],
    solidityDriveInstance: null,
    web3: null,
    accounts: null,
  };

  componentDidMount = async () => {
    try {
      if (window.ethereum) {
        //window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        //Get network provider and web3 instance
        const web3 = new Web3(window.ethereum);

        //Get Accounts
        const accounts = await web3.eth.getAccounts();

        //Get SolidityDrive Contract instance
        const solidityDriveAbi = SolidityDrive.abi;
        const networkId = await web3.eth.net.getId();
        const networkData = SolidityDrive.networks[networkId];
        const instance = new web3.eth.Contract(
          solidityDriveAbi,
          networkData.address
        ); //calling contract instance

        //set accounts, web3 and contract instannce to state
        this.setState(
          { web3, accounts, solidityDriveInstance: instance },
          this.runExample
        );
        console.log(accounts[0]);
      } else {
        window.alert("No Ethereum Browser detected, try Metamask!");
      }
    } catch (error) {
      alert(
        "Failed to load web3, ccounts or contract. Check console for details "
      );
      console.error(error);
    }
  };

  getFiles = async () => {
    try {
      const { accounts, solidityDriveInstance } = this.state;
      let filesLength = await solidityDriveInstance.methods
        .getlength()
        .call({ from: accounts[0] });
      let files = [];
      for (let i = 0; i < filesLength; i++) {
        let file = await solidityDriveInstance.methods
          .get(i)
          .call({ from: accounts[0] });
        files.push(file);
      }
      this.setState({ solidityDrive: files });
    } catch (error) {
      console.log(error);
    }
  };

  onDropped = async (file) => {
    try {
      const { solidityDriveInstance, accounts } = this.state;
      const stream = fileReaderPullStream(file);
      const result = await ipfs.add(stream);
      debugger;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (!this.state.web3) {
      <div>Loading web3, contracts and accounts...</div>;
    }

    return (
      <div id="App">
        <div className="container pt-3">
          <StyledDropZone onDrop={this.onDropped} />
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
              </tr>
              <tr>
                <th>
                  <FcDocument size={50} extension="docx" />
                </th>
                <th>Filename.docx</th>
                <th>2023/01/02</th>
              </tr>
            </thead>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
