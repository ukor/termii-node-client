/**
 * Switch allows you to send messages to any country
 * in the world across SMS and WhatsApp channel
 */

import { AxiosInstance } from "axios";

enum MessageChannel {
  "DND" = "dnd",
  "WHATSAPP" = "whatsapp",
  "GENERIC" = "generic",
}

enum TermiiDefaultIds {
  "Talert" = "Talert",
  "SecureOTP" = "SecureOTP",
}
interface Media {
  url: string;
  captions: string;
}
interface GeneralOptions {
  from: string;
  sms: string;
}
export interface PlainMessageOption extends GeneralOptions {
  to: string;
}

export interface BulkMessageOption extends GeneralOptions {
  to: [string];
}

export interface WhatsAppMessageOption extends PlainMessageOption {
  media?: Media;
}

interface MessageData extends WhatsAppMessageOption {
  api_key: string;
  channel: MessageChannel;
  type: string;
}

interface BulkMessageData extends BulkMessageOption {
  api_key: string;
  channel: MessageChannel;
  type: string;
  media?: Media;
}

export interface SendMessageResponse {
  messageId: string;
  status: boolean;
}

export interface MessageService {
  sendSms(opts: PlainMessageOption): Promise<SendMessageResponse>;
  sendBulkSms(payload: BulkMessageOption): Promise<SendMessageResponse>;
  sendSmsDnd(opts: PlainMessageOption, useDefaultTermiiDefaultId: boolean): Promise<SendMessageResponse>;
  sendBulkSmsDnd(payload: BulkMessageOption, useDefaultTermiiDefaultId: boolean): Promise<SendMessageResponse>;
  sendWhatsapp(opts: WhatsAppMessageOption): Promise<SendMessageResponse>;
}

export class Message implements MessageService {
  constructor(private readonly axios: AxiosInstance, private readonly apiKey: string) {}

  private async send(data: MessageData | BulkMessageData, path: string): Promise<SendMessageResponse> {
    const response: Record<string, string> = await this.axios.post(path, data);

    return {
      messageId: response.message_id,
      status: true,
    };
  }

  /**
   * This channel is used to send messages to phone number not on dnd
   *
   * https://developers.termii.com/messaging
   */
  async sendSms(opts: PlainMessageOption): Promise<SendMessageResponse> {
    const data: MessageData = {
      ...opts,
      api_key: this.apiKey,
      channel: MessageChannel.GENERIC,
      type: "plain",
    };

    return await this.send(data, "/api/sms/send");
  }

  /**
   * This channel is used to send bulk messages to phone number not on dnd
   *
   * https://developers.termii.com/messaging
   */
  async sendBulkSms(payload: BulkMessageOption): Promise<SendMessageResponse> {
    const data: BulkMessageData = {
      ...payload,
      api_key: this.apiKey,
      channel: MessageChannel.GENERIC,
      type: "plain",
    };

    return await this.send(data, "/api/sms/send/bulk");
  }

  /**
   * This channel allows users to send and deliver messages
   * to phone numbers with or without dnd restriction
   *
   * For customers sending messages to Nigeria,
   * DND stands for Do-Not-Disturb and phone numbers with
   * DND settings activated are blocked from receiving messages
   * from the generic route by the Mobile Network Operators.
   *
   * Learn more about DND (https://termii.medium.com/the-dnd-service-in-nigeria-everything-you-need-to-know-72b7247e3968)
   *
   * Termii Documentation
   * https://developers.termii.com/messaging
   */
  async sendSmsDnd(opts: PlainMessageOption, useDefaultTermiiDefaultId: boolean = true): Promise<SendMessageResponse> {
    if (useDefaultTermiiDefaultId) {
      opts.from = TermiiDefaultIds.SecureOTP;
    }
    const data: MessageData = {
      ...opts,
      api_key: this.apiKey,
      channel: MessageChannel.DND,
      type: "plain",
    };

    return await this.send(data, "/api/sms/send");
  }

  /**
   * This channel allows users to send and deliver bulk messages
   * to phone numbers with or without dnd restriction
   *
   * For customers sending messages to Nigeria,
   * DND stands for Do-Not-Disturb and phone numbers with
   * DND settings activated are blocked from receiving messages
   * from the generic route by the Mobile Network Operators.
   *
   * https://developers.termii.com/messaging
   */
  async sendBulkSmsDnd(
    payload: BulkMessageOption,
    useDefaultTermiiDefaultId: boolean = true,
  ): Promise<SendMessageResponse> {
    if (useDefaultTermiiDefaultId) {
      payload.from = TermiiDefaultIds.SecureOTP;
    }
    const data: BulkMessageData = {
      ...payload,
      api_key: this.apiKey,
      channel: MessageChannel.DND,
      type: "plain",
    };

    return await this.send(data, "/api/sms/send/bulk");
  }

  async sendWhatsapp(opts: WhatsAppMessageOption): Promise<SendMessageResponse> {
    const data: MessageData = {
      ...opts,
      api_key: this.apiKey,
      channel: MessageChannel.WHATSAPP,
      type: "plain",
    };

    return await this.send(data, "/api/sms/send");
  }
}
