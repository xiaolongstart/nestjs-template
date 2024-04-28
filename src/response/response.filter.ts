import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class ResponseFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "未知错误";
    if (exception instanceof HttpException) {
      const msg = exception.getResponse();
      if (typeof msg === 'string') {
        message = msg;
      } else if (typeof msg === 'object') {
        if ('message' in msg && msg.message instanceof Array) {
          message = msg.message[0];
        } else if ('message' in msg && typeof msg.message === 'string') {
          message = msg.message;
        }
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    } else if (typeof exception === "string") {
      message = exception;
    }
    response.status(status).json({
      code: status,
      message,
      success: false,
      timestamp: Math.floor(Date.now() / 1000),
    });
  }
}
