export class CreateFlagDto {
  code!: string;
  description!: string;
  severity!: 'low' | 'medium' | 'high';
}
