import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TodosModule } from './todos/todos.module';

const commonModules = [TodosModule];

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/common',
        children: commonModules.map((module) => ({
          path: '/',
          module,
        })),
      },
    ]),
    ...commonModules,
  ],
})
export class CommonGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('common');
  }
}
