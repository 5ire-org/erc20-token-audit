const {
  expect
} = require("chai");
const {
  ethers
} = require("hardhat");


describe("Test 5ire Token >", function () {
  let ireToken;
  let owner;
  let addr1, addr2;

  beforeEach(async function () {
    const IreToken = await ethers.getContractFactory("IRE");
    ireToken = await IreToken.deploy();
    await ireToken.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should successfully deploy", async function () {
    console.log("success!");
  });

  it("Should deploy with 1.5B of supply for the owner of the contract", async function () {
    const balance = await ireToken.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance) == 15000000000);
  });

  it("Should let you send tokens to another address", async function () {
    await ireToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await ireToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should let you give another address the approval to send on your behalf", async function () {
    await ireToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await ireToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await ireToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
    expect(await ireToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
  })

  it("Should add to Blacklist", async function () {
    await ireToken.addToBlackList([addr1.address, addr2.address]);
    expect(await ireToken.isBlacklisted(addr1.address)).to.equal(true);
    expect(await ireToken.isBlacklisted(addr2.address)).to.equal(true);
  })

  it("Should remove from Blacklist", async function () {
    await ireToken.addToBlackList([addr1.address, addr2.address]);
    await ireToken.removeFromBlackList([addr1.address]);
    expect(await ireToken.isBlacklisted(addr1.address)).to.equal(false);
  })

});