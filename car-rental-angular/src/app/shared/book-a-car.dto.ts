export interface BookACarDto {
  /** id‑ul maşinii care urmează să fie rezervată */
  carId: number;

  /** id‑ul utilizatorului care face rezervarea */
  userId: string;

  /** data de început a perioadei de închiriere – format ISO „YYYY‑MM‑DD” */
  fromDate: string;

  /** data de final a perioadei de închiriere – format ISO „YYYY‑MM‑DD” */
  toDate: string;
}