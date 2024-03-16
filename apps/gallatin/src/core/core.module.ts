import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class CoreModule {
  static forRoot() {
    const imports = [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        password: 'admintest',
        username: 'admintest',
        database: 'gallatin_write',
        autoLoadEntities: true,
        synchronize: true,
      }),
    ];
    return {
      module: CoreModule,
      imports,
    };
  }
}
