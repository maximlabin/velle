import ThemeStyles from "@/components/ThemeStyles";
import HomeMain from "@/components/generated/HomeMain";
import { pageMetadata } from "@/lib/content";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <ThemeStyles />
      <HomeMain />
    </>
  );
}
