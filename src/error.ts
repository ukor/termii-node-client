export class TermiiError extends Error {
  readonly documentation: string;
  constructor(message: string) {
    super(message);
    this.documentation = "See https://developers.termii.com/error";
  }
}
