import { IMeta } from 'src/utils/paginate';
import { IResponse } from '../interfaces/response.interface';
import { HttpException } from '@nestjs/common';

export class BaseService {
  public healthCheck(name: string): IResponse<string> {
    return this.success(`${name} is healthy`);
  }

  protected success<T>(data: T, message: string = 'Success'): IResponse<T> {
    return {
      statusCode: 200,
      success: true,
      message,
      data,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }

  protected error(message: string, statusCode: number = 400): IResponse<null> {
    throw new HttpException(
      {
        statusCode,
        success: false,
        message,
        data: null,
        metadata: {
          timestamp: new Date().toISOString(),
        },
      },
      statusCode,
    );
  }

  protected paginate<T>(
    data: T[],
    meta: IMeta,
    message: string = 'Success',
  ): IResponse<T[]> {
    return {
      statusCode: 200,
      success: true,
      message,
      data,
      meta,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }
}
