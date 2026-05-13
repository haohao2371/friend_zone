export class CreateRelationshipDto {
  friendId!: number;
  zoneId!: number;
  kind!: 'best_friend' | 'close_friend' | 'blocked';
  isActive!: boolean;
}
