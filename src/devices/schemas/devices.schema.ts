import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({
  timestamps: true,
})
export class Device {
  @Prop({
    required: true,
    unique: true,
  })
  deviceId!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
  })
  serialNumber!: string;

  @Prop({
    required: true,
  })
  location!: string;

  @Prop({
    enum: ['ONLINE', 'OFFLINE', 'MAINTENANCE'],
    default: 'OFFLINE',
  })
  status!: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);