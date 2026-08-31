interface StatusBadgeProps {
  responded: boolean;
}

export default function StatusBadge({ responded }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-base font-semibold ${
        responded
          ? "bg-green-100 text-green-800"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {responded ? "✅ 응답함" : "⏳ 아직 응답 없음"}
    </span>
  );
}
