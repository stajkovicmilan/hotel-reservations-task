
export interface IHotel {
    size: number;
    rooms: IRoom[]
}

export interface IRoom {
    roomId: number;
    reservedDays: number[];
    availableDays: number[];
}