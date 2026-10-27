import type { Metadata } from "next";
import "swiper/css/bundle";
import Header from "@/components/Header";
import ThemeScripts from "@/components/ThemeScripts";
import BwPromo from "@/components/generated/BwPromo";
import FeedbackPopup from "@/components/generated/FeedbackPopup";
import FeedbackSent from "@/components/generated/FeedbackSent";
import Footer from "@/components/generated/Footer";
import FreePopup from "@/components/generated/FreePopup";

export const metadata: Metadata = {
  metadataBase: new URL("https://velle.ru"),
  title: "Velle - растительная альтернатива молочным продуктам | официальный сайт",
  description: "Velle - растительная альтернатива молочным продуктам",
  icons: {
    icon: [
      { url: "/wp-content/uploads/2022/06/cropped-favicon-32x32.png", sizes: "32x32" },
      { url: "/wp-content/uploads/2022/06/cropped-favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/wp-content/uploads/2022/06/cropped-favicon-180x180.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <FeedbackPopup />
        <FreePopup />
        <FeedbackSent />
        <Footer />
        <BwPromo />
        <ThemeScripts />
      </body>
    </html>
  );
}
