"use client";

import { useEffect, useState } from "react";
import { CheckInRecord } from "@/types/checkIn";
import { getTodayCheckIn, submitTodayCheckIn } from "@/lib/checkInStorage";

export default function CheckInButton() {
  const [record, setRecord] = useState<CheckInRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecord(getTodayCheckIn());
    setLoading(false);
  }, []);

  function handleClick() {
    const result = submitTodayCheckIn();
    setRecord(result);
  }

  if (loading) {
    return <div className="h-16" aria-hidden="true" />;
  }

  if (record?.responded) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-green-50 border border-green-200 px-6 py-8 text-center">
        <span className="text-4xl">✅</span>
        <p className="text-lg sm:text-xl font-semibold text-green-800">
          오늘 응답이 완료되었습니다
        </p>
        {record.respondedAt && (
          <p className="text-sm sm:text-base text-green-700">
            {record.respondedAt}에 체크했어요. 내일 또 만나요!
          </p>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-2xl bg-orange-500 px-6 py-8 text-xl sm:text-2xl font-bold text-white shadow-md transition active:scale-[0.98] hover:bg-orange-600"
    >
      오늘 안부 체크하기
    </button>
  );
}
