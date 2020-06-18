import { HotelReservations } from "./core/HotelReservations";


describe('booking', () => {

  it('thows error', () => {
    try {
      const hotel = new HotelReservations(-1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual("Hotel size must be in range [1, 1000]");
    }
  });

  it('create Booking class with given size', () => {
    const hotel = new HotelReservations(1);
    expect(hotel.hotel.size).toEqual(1);
  });
});