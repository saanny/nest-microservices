import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class CoreModule {
  static forRoot() {
    const imports = [
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get<string>('GALLATIN_DB_HOST', 'localhost'),
          port: configService.get<number>('GALLATIN_DB_PORT', 5432),
          username: configService.get<string>(
            'GALLATIN_DB_USERNAME',
            'admintest',
          ),
          password: configService.get<string>(
            'GALLATIN_DB_PASSWORD',
            'admintest',
          ),
          database: configService.get<string>(
            'GALLATIN_DB_NAME',
            'gallatin_write',
          ),
          autoLoadEntities: true,
          synchronize: true,
        }),
      }),
    ];
    return {
      module: CoreModule,
      imports,
    };
  }
}
