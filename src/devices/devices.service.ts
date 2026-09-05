import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './schemas/devices.schema';

@Injectable()
export class DevicesService {
    constructor(
        @InjectModel(Device.name)
        private readonly deviceModel: Model<Device>,
    ) { }

    async create(createDeviceDto: CreateDeviceDto) {
        const device = await this.deviceModel.create(createDeviceDto);

        return {
            message: 'Device created successfully',
            data: device,
        };
    }

    async findAll() {
        const devices = await this.deviceModel
            .find()
            .sort({ createdAt: -1 });

        return {
            count: devices.length,
            data: devices,
        };
    }

    async findOne(id: string) {
        const device = await this.deviceModel.findById(id);

        if (!device) {
            throw new NotFoundException('Device not found');
        }

        return {
            data: device,
        };
    }

    async update(id: string, updateDeviceDto: UpdateDeviceDto) {
        const device = await this.deviceModel.findByIdAndUpdate(
            id,
            updateDeviceDto,
            { new: true },
        );

        if (!device) {
            throw new NotFoundException('Device not found');
        }

        return {
            message: 'Device updated successfully',
            data: device,
        };
    }

    async remove(id: string) {
        const device = await this.deviceModel.findByIdAndDelete(id);

        if (!device) {
            throw new NotFoundException('Device not found');
        }

        return {
            message: 'Device deleted successfully',
        };
    }

    async getStats() {
        const total = await this.deviceModel.countDocuments();

        const online = await this.deviceModel.countDocuments({
            status: 'ONLINE',
        });

        const offline = await this.deviceModel.countDocuments({
            status: 'OFFLINE',
        });

        const maintenance = await this.deviceModel.countDocuments({
            status: 'MAINTENANCE',
        });

        return {
            data: {
                total,
                online,
                offline,
                maintenance,
            },
        };
    }
}