import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryPersistenceModule } from 'src/alarms/infrastructure/persistence/in-memory/in-memory-persistence.module';

@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory'): DynamicModule {
    const persistenceModule = InMemoryPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
