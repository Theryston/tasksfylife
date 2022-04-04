export default class ErrorApp {
  status: number;
  message: string;

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message;
    this.status = status;
  }
}
