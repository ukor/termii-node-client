require("dotenv").config();
const { Termii } = require("../lib");

const TERMII_KEY = process.env.API_KEY;

(async () => {
  try {
    const tokenDetails = {
      pinType: "NUMERIC",
      to: "+2348000000001",
      from: "termii",
      channel: "generic",
      pinAttempts: 1,
      timeToLive: 60,
      digits: 4,
      message: "Hello from termii node wrapper. Your otp is <otp>",
    };

    const termii = Termii(TERMII_KEY);

    //   termii
    //     .token()
    //     .send(tokenDetails)
    //     .then((r) => console.log("response >>> ", r))
    //     .catch((e) => console.error("error >>> ", e));

    const sendRes = await termii.token().send(tokenDetails);

    console.log(sendRes, "send response");

    const verifyTokenDetails = {
      pin: 3480,
      pinId: "fbe014a4-6580-4c88-a1c9-7ad3df44000b",
    };

    const verifyRes = await termii.token().verify(verifyTokenDetails);

    console.log(verifyRes, "verify response");
  } catch (error) {
    console.log(error);
  }
})();
