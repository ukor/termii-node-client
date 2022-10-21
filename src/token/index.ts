/**
 * See https://developers.termii.com/token
 *
 * Token allows businesses generate, send and verify one-time-passwords.
 *
 */
import { AxiosInstance } from "axios";

export interface TokenService {
  send(data: SendTokenOptions): Promise<SendTokenResponse>;

  verify(data: VerifyTokenOptions): Promise<VerifyTokenResponse>;
}

export enum PIN_TYPE {
  "NUMERIC" = "NUMERIC",
  "APLHANUMERIC" = "APLHANUMERIC",
}

export enum CHANNEL {
  "DND" = "dnd",
  "WHATSAPP" = "whatapp",
  "GENERIC" = "generic",
  "EMAIL" = "email",
}

export interface SendTokenOptions {
  pinType: PIN_TYPE;
  to: string;
  from: string;
  channel: CHANNEL;
  pinAttempts: number;
  timeToLive: number;
  digits: number;
  message: string;
}

export interface VerifyTokenOptions {
  pinId: string;
  pin: string;
}

export interface SendTokenResponse {
  pinId: string;
  recipient: string;
  status: string;
}

export interface VerifyTokenResponse {
  pinId: string;
  recipient: string;
  verified: boolean;
}

interface SendTokenData {
  api_key: string;
  message_type: string;
  to: string;
  from: string;
  channel: string;
  pin_attempts: number;
  pin_time_to_live: number;
  pin_length: number;
  pin_placeholder: string;
  message_text: string;
}

interface VerifyTokenData {
  api_key: string;
  pin_id: string;
  pin: string;
}

export class Token implements TokenService {
  private readonly pinPlaceholder: string;
  constructor(private readonly axios: AxiosInstance, private readonly apiKey: string) {
    this.pinPlaceholder = "<otp>";
  }

  private async _send(opts: SendTokenOptions): Promise<SendTokenResponse> {
    const data = this.sendTokenData(opts);
    const path = "/api/sms/otp/send";

    const response: Record<string, string> = await this.axios.post(path, data);

    return {
      pinId: response.pinId,
      recipient: response.to,
      status: response.smsStatus,
    };
  }

  private sendTokenData(opts: SendTokenOptions): SendTokenData {
    if (opts.timeToLive > 60) {
      opts.timeToLive = 60;
    }
    if (opts.timeToLive < 0) {
      opts.timeToLive = 5;
    }
    return {
      api_key: this.apiKey,
      message_type: opts.pinType,
      to: opts.to,
      from: opts.from,
      channel: opts.channel,
      pin_attempts: opts.pinAttempts,
      pin_time_to_live: opts.timeToLive,
      pin_length: opts.digits,
      pin_placeholder: this.pinPlaceholder,
      message_text: opts.message,
    };
  }

  async send(data: SendTokenOptions) {
    return await this._send(data);
  }

  private verifyTokenData(opts: VerifyTokenOptions): VerifyTokenData {
    return {
      api_key: this.apiKey,
      pin_id: opts.pinId,
      pin: opts.pin,
    };
  }

  private async _verify(opts: VerifyTokenOptions): Promise<VerifyTokenResponse> {
    const data = this.verifyTokenData(opts);

    const path = "/api/sms/otp/verify";

    const response: Record<string, string> = await this.axios.post(path, data);

    return {
      pinId: response.pinId,
      verified: [true, "True", "true"].includes(response.verified),
      recipient: response.msisdn,
    };
  }

  async verify(data: VerifyTokenOptions) {
    return await this._verify(data);
  }
}
