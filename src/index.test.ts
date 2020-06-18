import { HotelReservations } from "./core/HotelReservations";
import { ReservationResultType } from "./core/IHotelReservations";


describe('Booking Requests Test', () => {

  it('Requests outside rooms range (Size=-1)', () => {
    try {
      const hotel = new HotelReservations(-1);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Hotel size must be in range [1, 1000]");
    }
  });

  it('Requests intside rooms range (Size=3)', () => {
    const hotel = new HotelReservations(3);
    expect(hotel.size).toEqual(3);
  });

  it('Requests outside planning period are declined (Size=1) --- Case 1', () => {
    const hotel = new HotelReservations(1);
    const reservation = hotel.createSingleReservation([-4, 2]);
    expect(reservation).toEqual(ReservationResultType.DECLINED);
  });

  it('Requests outside planning period are declined (Size=1) --- Case 2', () => {
    const hotel = new HotelReservations(1);
    const reservation = hotel.createSingleReservation([200, 400]);
    expect(reservation).toEqual(ReservationResultType.DECLINED);
  });

  it('Start date should be before end date (Size=1)', () => {
    const hotel = new HotelReservations(1);
    const reservation = hotel.createSingleReservation([3, 1]);
    expect(reservation).toEqual(ReservationResultType.DECLINED);
  });

  it('Requests are accepted (Size=3)', () => {
    const hotel = new HotelReservations(3);
    const reservations = hotel.createMultipleReservation([[0, 5], [7, 13], [3, 9], [5, 7], [6, 6], [0, 4]]);
    expect(reservations).toEqual([
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED]);
  });

  it('Requests are declined (Size=3)', () => {
    const hotel = new HotelReservations(3);
    const reservations = hotel.createMultipleReservation([[1, 3], [2, 5], [1, 9], [0, 15]]);
    expect(reservations).toEqual([
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.DECLINED]);
  });

  it('Requests can be accepted after a decline (Size=3)', () => {
    const hotel = new HotelReservations(3);
    const reservations = hotel.createMultipleReservation([[1, 3], [0, 15], [1, 9], [2, 5], [4, 9]]);
    expect(reservations).toEqual([
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.DECLINED,
      ReservationResultType.ACCEPTED]);
  });

  it('Complex Requests (Size=2)', () => {
    const hotel = new HotelReservations(2);
    const reservations = hotel.createMultipleReservation([[1, 3], [0, 4], [2, 3], [5, 5], [4, 10], [10, 10], [6, 7], [8, 10], [8, 9]]);
    expect(reservations).toEqual([
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.DECLINED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.DECLINED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED,
      ReservationResultType.ACCEPTED]);
  });

});