require("dotenv").config();
const { Termii } = require("../lib");

const TERMII_KEY = process.env.API_KEY;
const SENDER_ID = process.env.SENDER_ID;

(async () => {
  try {
    // +2348000000001
    const to = ["+234820733007", "+2348000000002", "+2348000000003", "+2348000000004"];
    const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: to[0],
      from: SENDER_ID,
    };

    const termii = Termii(TERMII_KEY);

    const sendsmsDnd = await termii.message().sendSmsDnd(msgDetails);
    console.log(sendsmsDnd, "<<< send sms dnd response");

    const sendBulSmsDnd = await termii.message().sendBulkSmsDnd({ ...msgDetails, to });
    console.log(sendBulSmsDnd, "<<< send sms dnd response");
  } catch (error) {
    console.log("message error >>>", error, "<<< message error");
  }
})();
