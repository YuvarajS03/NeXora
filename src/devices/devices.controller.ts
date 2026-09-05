import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
    constructor(
        private readonly devicesService: DevicesService,
    ) { }

    @Post()
    create(@Body() createDeviceDto: CreateDeviceDto) {
        return this.devicesService.create(createDeviceDto);
    }

    @Get()
    findAll() {
        return this.devicesService.findAll();
    }

    @Get('stats')
    getStats() {
        return this.devicesService.getStats();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.devicesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDeviceDto: UpdateDeviceDto,
    ) {
        return this.devicesService.update(id, updateDeviceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.devicesService.remove(id);
    }
}