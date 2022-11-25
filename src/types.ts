interface GeneralOptions {
  from: string;
  sms: string;
}

export interface Media {
  url: string;
  captions: string;
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

export interface SendMessageResponse {
  messageId: string;
  status: boolean;
}
