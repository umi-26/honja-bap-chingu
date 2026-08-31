import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4 py-16 gap-8 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">혼자밥친구</h1>
        <p className="mt-2 text-gray-600">
          혼자 사는 가족의 하루 안부를, 부담 없이 확인하는 서비스 (Mock MVP)
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link
          href="/checkin"
          className="flex-1 rounded-xl bg-orange-500 px-6 py-4 text-lg font-semibold text-white shadow hover:bg-orange-600"
        >
          안부 체크하기
        </Link>
        <Link
          href="/family"
          className="flex-1 rounded-xl bg-white border border-gray-300 px-6 py-4 text-lg font-semibold text-gray-800 shadow hover:bg-gray-50"
        >
          가족 화면 보기
        </Link>
      </div>
    </main>
  );
}
