"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CheckInButton from "@/components/CheckInButton";

function getTodayLabel(): string {
  const now = new Date();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[now.getDay()];
  return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${weekday})`;
}

export default function CheckInPage() {
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    setTodayLabel(getTodayLabel());
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-500">{todayLabel}</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            오늘 하루 괜찮으셨나요?
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            버튼 한 번만 눌러주시면, 가족에게 오늘도 잘 지내고 계신다는 소식이
            전해져요.
          </p>
        </div>

        <CheckInButton />

        <div className="text-center">
          <Link
            href="/family"
            className="text-sm sm:text-base text-orange-600 underline underline-offset-2"
          >
            가족 화면 미리보기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
