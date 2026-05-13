import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendsModule } from './friends/friends.module';
import { ZonesModule } from './zones/zones.module';
import { FlagsModule } from './flags/flags.module';
import { RelationshipModule } from './relationship/relationship.module';

@Module({
  imports: [FriendsModule, ZonesModule, FlagsModule, RelationshipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
