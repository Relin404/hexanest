import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    const imports = [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      ...(options.driver === 'orm'
        ? [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              useFactory: (
                configService: ConfigService,
              ): TypeOrmModuleOptions => ({
                type: configService.get<string>('DB_TYPE') as any,
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
              }),
              inject: [ConfigService],
            }),
          ]
        : []),
    ];

    return {
      module: CoreModule,
      imports,
    };
  }
}
