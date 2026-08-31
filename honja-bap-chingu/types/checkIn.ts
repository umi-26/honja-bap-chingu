export interface CheckInRecord {
  date: string; // 'YYYY-MM-DD'
  responded: boolean;
  respondedAt?: string; // 'HH:mm', 응답한 경우만
}
