import { AxiosInstance } from "./http";
import { Message, MessageService } from "./switch/send_message";
import { Token, TokenService } from "./token";

interface ProviderService {
  token(): TokenService;
  message(): MessageService;
}

class Provider implements ProviderService {
  constructor(readonly tokenService: TokenService, private readonly messageService: MessageService) {}

  token(): TokenService {
    return this.tokenService;
  }

  message(): MessageService {
    return this.messageService;
  }
}

export function Termii(apiKey: string) {
  const _token = new Token(AxiosInstance, apiKey);
  const _message = new Message(AxiosInstance, apiKey);
  return new Provider(_token, _message);
}
