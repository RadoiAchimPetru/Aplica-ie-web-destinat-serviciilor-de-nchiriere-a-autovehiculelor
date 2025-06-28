export interface ValidateCardDto {
  /** Numărul cardului fără spații (16…19 cifre)  */
  cardNumber: string;

  /** Lună expirare – ex. 3  sau 03  */
  expMonth: number;

  /** An expirare – ex. 2027  */
  expYear: number;

  /** CVC – 3-4 cifre  */
  cvc: string;
}
