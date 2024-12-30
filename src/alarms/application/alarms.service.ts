import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepostiory: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  async create(createAlarmCommand: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );

    return await this.alarmRepostiory.save(alarm);
  }

  async findAll() {
    return await this.alarmRepostiory.findAll();
  }
}
