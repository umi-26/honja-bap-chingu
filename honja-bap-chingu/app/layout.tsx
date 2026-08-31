import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "혼자밥친구",
  description: "혼자 사는 가족의 하루 안부를 확인하는 Mock MVP",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
