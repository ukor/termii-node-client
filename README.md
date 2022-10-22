# termii-node-client

NodeJs wrapper for Termii API. See [termii documentation](https://developers.termii.com/)


## Tokens
Token allows businesses generate, send and verify one-time-passwords.

- ### Send Token
The send token API allows businesses trigger one-time-passwords (OTP) across any available messaging channel on Termii. One-time-passwords created are generated randomly and there's an option to set an expiry time.

```javascript

    const tokenDetails = {
      pinType: "NUMERIC",
      to: "+2348000000001",
      from: "termii",
      channel: "generic",
      pinAttempts: 1,
      timeToLive: 60,
      digits: 4,
      message: "Hello from termii node wrapper. Your OTP is <otp>",
    };

    const termii = Termii(TERMII_KEY);

    termii
        .token()
        .send(tokenDetails)
        .then((r) => console.log("response >>> ", r))
        .catch((e) => console.error("error >>> ", e));

```
#### Using Asyn/Await 
```javascript
const sendRes = await termii.token().send(tokenDetails);
```

- ### Verify Token

Verify token API, checks tokens sent to customers and returns a response confirming the status of the token. A token can either be confirmed as verified or expired based on the timer set for the token.

```javascript

const verifyTokenDetails = {
      pin: 3480,
      pinId: "fbe014a4-6580-4c88-a1c9-7ad3df44000b",
    };

    const verifyRes = await termii.token().verify(verifyTokenDetails);

    console.log(verifyRes, "verify response");
```


- ### Switch
Switch allows you to send messages to any country in the world across SMS and WhatsApp channel

- Send Message

This channel is used to send messages to phone number not on dnd

```javascript

const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: '+2348000000001',
      from: "Termii",
    };

    const termii = Termii(TERMII_KEY);

    const sendsms = await termii.message().sendSms(msgDetails);
    console.log(sendsms, "<<< send sms response");
```


- Send Bulk Message 

```javascript
const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: ["+2348000000001", "+2348000000002", "+2348000000003"],
      from: "Termii",
    };

    const termii = Termii(TERMII_KEY);

    const sendBulksms = await termii.message().sendBulkSms(msgDetails);
    console.log(sendBulksms, "<<< send sms response");
```

- Send DND Message

This channel allows users to send and deliver messages to phone numbers with or without dnd restriction 

For customers sending messages to Nigeria, DND stands for Do-Not-Disturb and phone numbers with DND settings activated are blocked from receiving messages from the generic route by the Mobile Network Operators.

See https://developers.termii.com/messaging

```javascript

const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: '+2348000000001',
      from: "Termii",
    };

    const termii = Termii(TERMII_KEY);

    const sendsms = await termii.message().sendSmsDnd(msgDetails);
    console.log(sendsms, "<<< send sms response");
```


- Send Bulk Message 

```javascript
const msgDetails = {
      sms: "Testing termii node client wrapper",
      to: ["+2348000000001", "+2348000000002", "+2348000000003"],
      from: "Termii",
    };

    const termii = Termii(TERMII_KEY);

    const sendBulksms = await termii.message().sendBulkSmsDnd(msgDetails);
    console.log(sendBulksms, "<<< send sms response");
```