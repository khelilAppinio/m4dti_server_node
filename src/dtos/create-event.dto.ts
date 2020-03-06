import { IsString, IsArray } from "class-validator";

export class CreateEventDto {
    @IsString()
    time: string;
    @IsString()
    event_type: string;
    @IsArray()
    properties_attributes: {
        name: string,
        property_type: string,
        value?: string | boolean,
        documents_attributes?: string[]
    }[];
}