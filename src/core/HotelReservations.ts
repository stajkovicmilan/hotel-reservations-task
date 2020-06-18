import { IHotelReservations, ReservationResultType } from "../models/IHotelReservations";
import { IHotel, IRoom } from "../models/IHotel";

export class HotelReservations implements IHotelReservations {
    
    public hotel: IHotel;

    private minMaxHotelSize = [1, 1000];
    private daysRangeLimits = [0, 364]

    constructor (public size: number) {
        if (size > this.minMaxHotelSize[0] && size < this.minMaxHotelSize[1]) {
            throw new Error(`Hotel size must be in range [${this.minMaxHotelSize[0]}, ${this.minMaxHotelSize[1]}]`);
        } else {
            this.hotel = this.setupDefaultHotelValues(size);
        }
    }

    public createSingleReservation(daysRange: [number, number]): ReservationResultType {
        let reservationDecision: ReservationResultType = ReservationResultType.DECLINED;

        if (daysRange[0] > daysRange[1]) {
            console.log('Start date should not be after end date!')
            return reservationDecision;
        }

        if (daysRange[0] < this.daysRangeLimits[0] || daysRange[1] > this.daysRangeLimits[1]) {
            console.log('Start date and end date should be in range [0, 364]!')
            return reservationDecision;
        }

        const extendedDaysRange: number[] = this.extendDaysRange(daysRange);
        for (let i = 0; i < this.hotel.rooms.length; i++) {
            reservationDecision = this.checkRoomAvailability(extendedDaysRange, this.hotel.rooms[i].availableDays)
                ? ReservationResultType.ACCEPTED : ReservationResultType.DECLINED;
            if (reservationDecision === ReservationResultType.ACCEPTED) {
                this.hotel.rooms[i].reservedDays = [...this.hotel.rooms[i].reservedDays, ...extendedDaysRange];
                this.hotel.rooms[i].availableDays = this.hotel.rooms[i].availableDays.filter(day => !extendedDaysRange.includes(day));
                break;
            }
        }

        return reservationDecision;

    }

    public createMultipleReservation(daysRanges: [number, number][]): ReservationResultType[] {
        const reservationDecisions: ReservationResultType[] = [];
        
        daysRanges.forEach(range => reservationDecisions.push(this.createSingleReservation(range)));
        
        return reservationDecisions;
    }

    private setupDefaultHotelValues(size: number): IHotel {
        const newHotel: IHotel = {
            size: size,
            rooms: [],
        };

        for (let i = 0; i < size; i++) {
            const newRoom: IRoom = {
                roomId: i,
                availableDays: new Array(365).fill(0).map((_, index) => index),
                reservedDays: []
            }
            newHotel.rooms.push(newRoom);
        };
        return newHotel;
    }

    private extendDaysRange(daysRange: [number, number]): number[] {
        const extendedDaysRange: number[] = [];
        for (let i = daysRange[0]; i <= daysRange[1]; i++) {
            extendedDaysRange.push(i);
        }
        return extendedDaysRange;
    }

    private checkRoomAvailability(daysForReservation: number[], availableDays: number[]): boolean {
        return daysForReservation.every( day => availableDays.includes(day));
    }
}