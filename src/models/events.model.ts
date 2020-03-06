export interface Events {
    id: number;
    event_type: string;
    time: string;
    properties: {
        name: string,
        property_type: string,
        value: string | boolean
    }[]
}