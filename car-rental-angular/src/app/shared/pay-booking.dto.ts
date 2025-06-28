export interface PayBookingDto {
  /** ID-ul rezervării întors de backend la pasul ❶  */
  bookingId: number;

  /** paymentMethodId returnat de Stripe după validare  */
  paymentMethodId: string;

  returnLat:       number;
  returnLng:       number;
}
