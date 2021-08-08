const request = require("supertest");
const app = require("../index");
const User = require("../models/user.model");

describe("Create user", () => {
  it("Should create a user", async () => {
    const res = await request(app).post("/login/register").send({
      username: "test",
      password: "test",
    });
    //remove test user
    await User.findOneAndDelete({username: 'test'})
    expect(res.statusCode).toEqual(200);
  });
});
