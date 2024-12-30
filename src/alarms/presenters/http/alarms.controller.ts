import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlarmsService } from 'src/alarms/application/alarms.service';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { CreateAlarmDto } from 'src/alarms/presenters/http/dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  async create(@Body() createAlarmDto: CreateAlarmDto) {
    return await this.alarmsService.create(
      new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity),
    );
  }

  @Get()
  async findAll() {
    return await this.alarmsService.findAll();
  }
}
