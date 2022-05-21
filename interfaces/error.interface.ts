export default interface Error {
  message: string;
  response: {
    status: number;
  };
}
