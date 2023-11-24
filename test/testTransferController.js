const { expect } = require("chai");
const sinon = require("sinon");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");
const Transfer = require("../src/models/Transfer");
const { initTrans } = require("../src/controllers/transferController");

const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

describe("initTrans Function", () => {
  let server;
  let initiateStub;

  beforeEach(() => {
    initiateStub = sinon.stub(flw.Transfer, "initiate");
    server = supertest(app);
  });

  afterEach(() => {
    initiateStub.restore();
  });

  it("should initiate transfer and save to database", async () => {
    const req = {
      body: {
        account_bank: "044",
        account_number: "0690000040",
        amount: 200,
        narration: "ionnodo",
        currency: "NGN",
        reference: "transfer-123",
        callback_url:
          "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
        debit_currency: "NGN",
      },
      user: {
        userId: "655fd9f3d55fdc518e02e27e",
      },
    };
    const userIdString = "655fd9f3d55fdc518e02e27e";
    const userIdObject = new mongoose.Types.ObjectId(userIdString);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    initiateStub.resolves({ data: { status: "success" } });

    await initTrans(req, res);

    const savedTransfer = await Transfer.findOne({ reference: "transfer-123" });
    expect(savedTransfer).to.exist;
    expect(savedTransfer.user).to.deep.equal(userIdObject);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ response: { data: { status: "success" } } }))
      .to.be.false;
  });
});
