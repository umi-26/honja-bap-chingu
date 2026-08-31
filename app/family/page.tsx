"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import HistoryList from "@/components/HistoryList";
import { CheckInRecord } from "@/types/checkIn";
import { getRecentHistory, getTodayCheckIn } from "@/lib/checkInStorage";

export default function FamilyPage() {
  const [today, setToday] = useState<CheckInRecord | null>(null);
  const [history, setHistory] = useState<CheckInRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToday(getTodayCheckIn());
    setHistory(getRecentHistory());
    setLoading(false);
  }, []);

  const respondedCount = history.filter((r) => r.responded).length;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            오늘의 안부
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            가족의 응답 현황을 확인하세요
          </p>
        </div>

        <section className="rounded-2xl bg-white border border-gray-200 px-6 py-8 flex flex-col items-center gap-3 text-center shadow-sm">
          <p className="text-base sm:text-lg text-gray-600">오늘</p>
          {loading ? (
            <div className="h-9" aria-hidden="true" />
          ) : (
            <StatusBadge responded={today?.responded ?? false} />
          )}
          {today?.responded && today.respondedAt && (
            <p className="text-sm text-gray-500">
              {today.respondedAt}에 응답했어요
            </p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              최근 7일 현황
            </h2>
            <span className="text-sm text-gray-500">
              {respondedCount}/7일 응답
            </span>
          </div>
          {loading ? (
            <div className="h-40" aria-hidden="true" />
          ) : (
            <HistoryList records={history} />
          )}
        </section>

        <div className="text-center">
          <Link
            href="/checkin"
            className="text-sm sm:text-base text-orange-600 underline underline-offset-2"
          >
            사용자 화면 보기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
