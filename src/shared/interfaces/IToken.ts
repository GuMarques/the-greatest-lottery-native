export default interface IToken {
  type: string;
  token: string;
  expires_at: Date | undefined;
}
