import {
  Logger,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class ExecutionTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExecutionTimeInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const controllerName = context.getClass().name;
    const methodName = context.getHandler().name;

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Executed method ${methodName} of ${controllerName} in ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
