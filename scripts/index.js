// scripts/index.js
async function main () {
    // Our code will go here
    // Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);

// Set up an ethers contract, representing our deployed Box instance
const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const Fire = await ethers.getContractFactory('Fire');
const fire  = await Fire.deploy();
const name = await fire.name();
console.log(await fire.name())
console.log(await fire.symbol())
console.log(await fire.decimals())
console.log(parseInt(await fire.totalSupply(),16))
console.log(await fire.balanceOf(address)._hex)


  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
});