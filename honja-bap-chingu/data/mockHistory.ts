import { CheckInRecord } from "@/types/checkIn";

// 지난 6일치 고정 mock 데이터 (오늘 기록은 checkInStorage를 통해 합쳐집니다)
export const mockHistory: CheckInRecord[] = [
  { date: "2026-08-25", responded: true, respondedAt: "19:02" },
  { date: "2026-08-26", responded: true, respondedAt: "18:47" },
  { date: "2026-08-27", responded: false },
  { date: "2026-08-28", responded: true, respondedAt: "19:15" },
  { date: "2026-08-29", responded: true, respondedAt: "18:30" },
  { date: "2026-08-30", responded: true, respondedAt: "19:00" },
];
