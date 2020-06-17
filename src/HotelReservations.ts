import { IHotelReservations, ReservationResultType } from "./IHotelReservations";

export class HotelReservations implements IHotelReservations {
    
    public hotelSize: number;

    private minMaxHotelSize = [1, 1000];

    constructor (public size: number) {
        if (size > this.minMaxHotelSize[0] && size < this.minMaxHotelSize[1]) {
            throw new Error(`Hotel size must be in range [${this.minMaxHotelSize[0]}, ${this.minMaxHotelSize[1]}]`);
        } else {
            this.hotelSize = size;
        }
    }

    public createSingleReservation(daysRange: [string, string]): ReservationResultType {
        return ReservationResultType.ACCEPTED;
    }

    public createMultipleReservation(daysRanges: [string, string][]): ReservationResultType[] {
        return [ReservationResultType.ACCEPTED];
    }
}