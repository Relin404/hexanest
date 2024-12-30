import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from 'src/alarms/presenters/http/alarms.controller';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { AlarmsInfrastructureModule } from 'src/alarms/infrastructure/persistence/alarms-infrastructure.module';

@Module({
  imports: [AlarmsInfrastructureModule],
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory],
})
export class AlarmsModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
