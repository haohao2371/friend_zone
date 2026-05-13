export class Relationship {
  id!: number;
  friendId!: number;
  zoneId!: number;
  kind!: 'best_friend' | 'close_friend' | 'blocked';
  isActive!: boolean;
}
