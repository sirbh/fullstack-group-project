const User = require("../../models/user");
const { expect } = require("chai");
const { findUserById, saveUser, removeUser, updateUserDetails } = require("../../utils/dbUtils");
const { createResponse } = require("node-mocks-http");

// Get users (create copies for test isolation)
const users = require("../../setup/users.json").map((user) => ({ ...user }));
const adminUser = { ...users.find((u) => u.role === "admin") };
const customerUser = { ...users.find((u) => u.role === "customer") };

describe("DataBase Utils", () => {
  let currentUser;
  let customer;
  let response;

  beforeEach(async () => {
    // reset database
    await User.deleteMany({});
    await User.create(users);

    // set variables
    currentUser = await User.findOne({ email: adminUser.email }).exec();
    customer = await User.findOne({ email: customerUser.email }).exec();
    response = createResponse();
  });
  describe("findUserById()", () => {
    it("should return a user with given Id", async () => {
      const user = await findUserById(currentUser._id);
      expect(user).to.not.be.null;
      expect(user).to.not.be.undefined;
      expect(user).to.be.an("object");
      expect(user.email).to.equal(currentUser.email);
      expect(user._id.toString()).to.equal(currentUser._id.toString());
      expect(user.name).to.equal(currentUser.name);
      expect(user.role).to.equal(currentUser.role);
    });
    it("should return null if given Id not found", async () => {
      const user = await findUserById("randomId");
      expect(user).to.be.null;
    });
  });
  describe("saveUser()", () => {
    it("should save the user with default role of customer", async () => {
      const testEmail = `test${adminUser.password}@email.com`;
      const userData = { ...adminUser, email: testEmail };
      const user = await saveUser(userData);

      expect(user).to.not.be.null;
      expect(user).to.not.be.undefined;
      expect(user).to.be.an("object");
      expect(user.role).to.equal("customer");
      expect(user.email).to.equal(testEmail);
      expect(user.name).to.equal(userData.name);
    });
    it("should return null if user details are missing", async () => {
      const user = await saveUser({});
      expect(user).to.be.null;
    });
    it("should return null if email is not in correct format", async () => {
      const userData = { ...adminUser, email: 'testEmail' };
      const user = await saveUser({});
      expect(user).to.be.null;
    });
    it("should return null if password is missing", async () => {
        const userData = { ...adminUser, email: 'testEmail',password: '' };
        const user = await saveUser({});
        expect(user).to.be.null;
      });
  });

  describe("removeUser()",()=>{
    it("should remove the user with given Id",async()=>{
      const user = await removeUser(customer._id);
      const foundUser = await User.findById(customer._id).exec();
      expect(foundUser).to.be.null;
    });
    it("should return the removed user",async()=>{
      const user = await removeUser(customer._id);
      expect(user).to.not.be.null;
      expect(user).to.not.be.undefined;
      expect(user).to.be.an("object");
      expect(user.email).to.equal(customer.email);
      expect(user._id.toString()).to.equal(customer._id.toString());
      expect(user.name).to.equal(customer.name);
      expect(user.role).to.equal(customer.role);
    });
  })

  describe("updateUserDetails()",()=>{
    it("should update the user details",async()=>{
      customer.name = 'testName';
      const updatedUser = await updateUserDetails(customer);
      expect(updatedUser).to.not.be.null;
      expect(updatedUser).to.not.be.undefined;
      expect(updatedUser).to.be.an("object");
      expect(updatedUser.email).to.equal(customer.email);
      expect(updatedUser._id.toString()).to.equal(customer._id.toString());
      expect(updatedUser.name).to.equal('testName');
      expect(updatedUser.role).to.equal(customer.role);
    });
    it("should return null if user details are missing",async()=>{
      const updatedUser = await updateUserDetails({});
      expect(updatedUser).to.be.null;
    });
    it("should return null if email is not in correct format",async()=>{
      const updatedUser = await updateUserDetails({email:'testEmail'});
      expect(updatedUser).to.be.null;
    });
    it("should return null if password is m",async()=>{
      const updatedUser = await updateUserDetails({email:'testEmail',password:''});
      expect(updatedUser).to.be.null;
    });
  })
});
