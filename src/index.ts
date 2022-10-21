import { AxiosInstance } from "./http";
import { Token, TokenService } from "./token";

interface ProviderService {
  token(): TokenService;
}

class Provider implements ProviderService {
  constructor(readonly tokenService: TokenService) {}

  token(): TokenService {
    return this.tokenService;
  }
}

export function Termii(apiKey: string) {
  const _token = new Token(AxiosInstance, apiKey);
  return new Provider(_token);
}
