export interface IHotelReservations {
    createSingleReservation(daysRange: [number, number]): ReservationResultType;
    createMultipleReservation(daysRanges: [number, number][]): ReservationResultType[];
}

export enum ReservationResultType {
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED'
}