class HttpError {
  constructor(private status: number, private data: any) {}
  getStatus() {
    return this.status;
  }
  getData() {
    return this.data;
  }
}

export default HttpError;
