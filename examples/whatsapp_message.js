require("dotenv").config();
const { Termii } = require("../lib");

const TERMII_KEY = process.env.API_KEY;
const SENDER_ID = process.env.SENDER_ID;

(async () => {
  try {
    const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: "+2348000000001",
      from: SENDER_ID,
      media: {
        url: "https://media.example.com/file",
        caption: "your media file",
      },
    };

    const termii = Termii(TERMII_KEY);

    const sendWhatsapp = await termii.message().sendWhatsapp(msgDetails);
    console.log(sendWhatsapp, "<<< send whatsapp response");
  } catch (error) {
    console.log("message error >>>", error, "<<< message error");
  }
})();
