const { expect } = require("chai");
const { ethers } = require("hardhat");
const { waffle }  = require("@nomiclabs/hardhat-waffle");

describe("Fire Token", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Fire = await ethers.getContractFactory("Fire");
    const greeter = await Fire.deploy();
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
