import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryPersistenceModule } from 'src/alarms/infrastructure/persistence/in-memory/in-memory-persistence.module';
import { OrmAlarmPersistenceModule } from 'src/alarms/infrastructure/persistence/orm/orm-persistence.module';

@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory'): DynamicModule {
    const persistenceModule =
      driver === 'orm' ? OrmAlarmPersistenceModule : InMemoryPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
