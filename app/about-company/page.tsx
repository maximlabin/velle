import ThemeStyles from "@/components/ThemeStyles";
import AboutMain from "@/components/generated/AboutMain";
import { pageMetadata } from "@/lib/content";

export const metadata = pageMetadata("/about-company/");

export default function Page() {
  return (
    <>
      <ThemeStyles section="about" />
      <AboutMain />
    </>
  );
}
