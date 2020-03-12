import { ValidateNested, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateEventDto {
  @ValidateNested({ each: true })
  properties_attributes: PropertyAtribute[]
}

class PropertyAtribute {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  property_type: string;
  @IsNotEmpty()
  value: any;
}