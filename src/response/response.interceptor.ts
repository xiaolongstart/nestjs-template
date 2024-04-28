import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from "@nestjs/common";
import { type Observable, map } from 'rxjs';
import { type Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timestamp = Math.floor(Date.now() / 1000);
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        return {
          code: response.statusCode,
          message: "success",
          success: true,
          result: data,
          timestamp: timestamp,
        };
      }),
    );
  }
}
