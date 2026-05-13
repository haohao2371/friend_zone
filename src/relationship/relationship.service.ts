import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { Relationship } from './entities/relationship.entity';

@Injectable()
export class RelationshipService {
  private readonly relationships: Relationship[] = [
    {
      id: 1,
      friendId: 1,
      zoneId: 1,
      kind: 'best_friend',
      isActive: true,
    },
  ];

  create(createRelationshipDto: CreateRelationshipDto) {
    const relationship: Relationship = {
      id: this.getNextId(),
      ...createRelationshipDto,
    };

    this.relationships.push(relationship);
    return relationship;
  }

  findAll() {
    return this.relationships;
  }

  findOne(id: number) {
    return this.findById(id);
  }

  update(id: number, updateRelationshipDto: UpdateRelationshipDto) {
    const relationship = this.findById(id);
    Object.assign(relationship, updateRelationshipDto);
    return relationship;
  }

  remove(id: number) {
    const index = this.relationships.findIndex(
      (relationship) => relationship.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Relationship not found');
    }

    return this.relationships.splice(index, 1)[0];
  }

  private findById(id: number) {
    const relationship = this.relationships.find((item) => item.id === id);
    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }

    return relationship;
  }

  private getNextId() {
    return Math.max(...this.relationships.map((item) => item.id), 0) + 1;
  }
}
