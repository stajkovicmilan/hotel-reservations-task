export interface IHotelReservations {
    createSingleReservation(daysRange: [string, string]): ReservationResultType;
    createMultipleReservation(daysRanges: [string, string][]): ReservationResultType[];
}

export enum ReservationResultType {
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED'
}