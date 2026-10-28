import ThemeStyles from "@/components/ThemeStyles";
import ContactsMain from "@/components/generated/ContactsMain";
import { pageMetadata } from "@/lib/content";

export const metadata = pageMetadata("/contacts/");

export default function Page() {
  return (
    <>
      <ThemeStyles />
      <ContactsMain />
    </>
  );
}
