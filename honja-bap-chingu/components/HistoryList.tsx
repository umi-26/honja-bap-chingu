import { CheckInRecord } from "@/types/checkIn";
import StatusBadge from "./StatusBadge";

interface HistoryListProps {
  records: CheckInRecord[];
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일 (${weekday})`;
}

export default function HistoryList({ records }: HistoryListProps) {
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {sorted.map((record) => (
        <li
          key={record.date}
          className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4"
        >
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-900">
              {formatDateLabel(record.date)}
            </p>
            {record.responded && record.respondedAt && (
              <p className="text-xs sm:text-sm text-gray-500">
                {record.respondedAt}에 응답
              </p>
            )}
          </div>
          <StatusBadge responded={record.responded} />
        </li>
      ))}
    </ul>
  );
}
