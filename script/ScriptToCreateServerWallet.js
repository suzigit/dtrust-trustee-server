const ethers = require('ethers');
require("dotenv").config();
const fs = require('fs');

let wallet = ethers.Wallet.createRandom();
const password = process.env.WALLET_PASS;

const promisseJSON = wallet.encrypt(password);
promisseJSON.then((jsonWallet) => {
    console.log(jsonWallet);
    fs.writeFileSync("serverwallet.json", jsonWallet);
});