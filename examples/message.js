require("dotenv").config();
const { Termii } = require("../lib");

const TERMII_KEY = process.env.API_KEY;
const SENDER_ID = process.env.SENDER_ID;

(async () => {
  try {
    // +2348000000001
    const to = ["+2348000000001", "+2348000000002", "+2348000000003", "+2348000000004"];
    const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: to[0],
      from: SENDER_ID,
    };

    const termii = Termii(TERMII_KEY);

    const sendsms = await termii.message().sendSms(msgDetails);
    console.log(sendsms, "<<< send sms response");
    const sendBulksms = await termii.message().sendBulkSms({ ...msgDetails, to });
    console.log(sendBulksms, "<<< send sms response");
  } catch (error) {
    console.log("message error >>>", error, "<<< message error");
  }
})();
