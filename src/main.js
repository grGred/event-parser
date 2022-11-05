var dotenv = require("dotenv");
dotenv.config();
var id = process.env.INFURA_ID;
var Contract = require("web3-eth-contract");
var abi = require("./abi/BSC-USDT.json");

// works only with wss
Contract.setProvider("wss://mainnet.infura.io/ws/v3/" + `${id}`);

// ethereum USDT address
var address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
var USDT = new Contract(abi, address);

// Create subscription
USDT.events
  .Transfer(() => {})
  .on("connected", function (subscriptionId) {
    console.log("SubID: ", subscriptionId);
  })
  .on("data", function (event) {
    // console.log('Event:', event); // raw object of the event if needed
    console.log('-'.repeat(50));
    console.log(Date());
    console.log("TxHash: ", event.transactionHash);
    console.log("From: ", event.returnValues.from);
    console.log("To: ", event.returnValues.to);
    console.log("Amount: ", event.returnValues.value);
  })
  .on("changed", function (event) {
    //write to database?
  })
  .on("error", function (error, receipt) {
    console.log("Error:", error, receipt);
  });
