export class BaseResponse {
  status_code: number;
  message: string;

  constructor(status_code: number, message: string) {
    this.status_code = status_code;
    this.message = message;
  }
}

export class APISuccessResponse extends BaseResponse {
  data: any;

  constructor(status_code: number, message: string, data: any) {
    super(status_code, message);
    this.data = data;
  }
}

export class APIErrorResponse extends BaseResponse {
  stack: string;

  constructor(status_code: number, message: string, stack: string) {
    super(status_code, message);
    this.stack = stack;
  }
}
