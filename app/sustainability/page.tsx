import ThemeStyles from "@/components/ThemeStyles";
import SustainabilityMain from "@/components/generated/SustainabilityMain";
import { pageMetadata } from "@/lib/content";

export const metadata = pageMetadata("/sustainability/");

export default function Page() {
  return (
    <>
      <ThemeStyles section="sustainability" />
      <SustainabilityMain />
    </>
  );
}
