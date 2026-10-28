import ThemeStyles from "@/components/ThemeStyles";
import WhereMain from "@/components/generated/WhereMain";
import { pageMetadata } from "@/lib/content";

export const metadata = pageMetadata("/where/");

export default function Page() {
  return (
    <>
      <ThemeStyles />
      <WhereMain />
    </>
  );
}
