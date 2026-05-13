export class CreateZoneDto {
  name!: string;
  description!: string;
  visibility!: 'public' | 'private';
}
