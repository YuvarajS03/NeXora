import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    deviceId!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    serialNumber!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsOptional()
    @IsIn(['ONLINE', 'OFFLINE', 'MAINTENANCE'])
    status?: string;
}