import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(map((data) => this.transformNullValues(data)));
  }

  private transformNullValues(data: unknown): unknown {
    if (data === null || data === undefined) {
      return '';
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.transformNullValues(item));
    }

    if (typeof data === 'object') {
      const result: Record<string, unknown> = {};
      for (const key of Object.keys(data)) {
        result[key] = this.transformNullValues(
          (data as Record<string, unknown>)[key],
        );
      }
      return result;
    }

    return data;
  }
}
