import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  private readonly friends: Friend[] = [
    {
      id: 1,
      name: 'Avery',
      favoriteZoneId: 1,
      flagIds: [1],
      relationshipId: 1,
    },
  ];

  private nextId = 2;

  create(createFriendDto: CreateFriendDto) {
    const friend: Friend = {
      id: this.nextId++,
      ...createFriendDto,
    };

    this.friends.push(friend);
    return friend;
  }

  findAll() {
    return this.friends;
  }

  findOne(id: number) {
    return this.findById(id);
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    const friend = this.findById(id);
    Object.assign(friend, updateFriendDto);
    return friend;
  }

  remove(id: number) {
    const index = this.friends.findIndex((friend) => friend.id === id);
    if (index === -1) {
      throw new NotFoundException(`Friend ${id} not found`);
    }

    return this.friends.splice(index, 1)[0];
  }

  private findById(id: number) {
    const friend = this.friends.find((item) => item.id === id);
    if (!friend) {
      throw new NotFoundException(`Friend ${id} not found`);
    }

    return friend;
  }
}
