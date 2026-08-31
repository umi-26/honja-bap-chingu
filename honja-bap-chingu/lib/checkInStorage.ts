import { CheckInRecord } from "@/types/checkIn";
import { mockHistory } from "@/data/mockHistory";

const STORAGE_KEY = "honjabap_checkin_records";

/**
 * mock 저장소 영역입니다.
 * 실제 서비스로 전환 시, 이 파일의 함수들을 서버 API 호출로 교체하면 됩니다.
 * (예: fetch('/api/checkin', { method: 'POST' }) 등)
 */

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTimeString(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function readLocalRecords(): Record<string, CheckInRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CheckInRecord>;
  } catch {
    // 저장소 값이 손상되었거나 읽을 수 없는 경우, 안전하게 빈 값으로 처리
    return {};
  }
}

function writeLocalRecords(records: Record<string, CheckInRecord>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // 저장 실패 시에도 앱이 멈추지 않도록 무시 (mock 처리 범위)
  }
}

/** 오늘 안부 체크를 완료로 기록합니다 (mock: 로컬 저장소에만 저장). */
export function submitTodayCheckIn(): CheckInRecord {
  const today = getTodayDateString();
  const record: CheckInRecord = {
    date: today,
    responded: true,
    respondedAt: getTimeString(),
  };
  const records = readLocalRecords();
  records[today] = record;
  writeLocalRecords(records);
  return record;
}

/** 오늘 응답 기록을 조회합니다. 기록이 없으면 "아직 응답 없음" 상태를 반환합니다. */
export function getTodayCheckIn(): CheckInRecord {
  const today = getTodayDateString();
  const records = readLocalRecords();
  return records[today] ?? { date: today, responded: false };
}

/**
 * 최근 7일 응답 현황을 반환합니다.
 * data/mockHistory.ts의 지난 6일 고정 데이터 + 오늘 로컬 기록을 합쳐 날짜순으로 정렬합니다.
 */
export function getRecentHistory(): CheckInRecord[] {
  const today = getTodayCheckIn();
  const combined = [...mockHistory.filter((r) => r.date !== today.date), today];
  return combined.sort((a, b) => a.date.localeCompare(b.date));
}
