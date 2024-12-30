import { DynamicModule, Module } from '@nestjs/common';
import { AlarmsModule } from 'src/alarms/application/alarms.module';
import { AlarmsInfrastructureModule } from 'src/alarms/infrastructure/persistence/alarms-infrastructure.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  /**
   * Registers the application with the given options.
   * @param options The options to use.
   * @returns The module configuration.
   * @example
   * AppModule.register({
   *  driver: 'orm',
   * });
   */
  static register(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
