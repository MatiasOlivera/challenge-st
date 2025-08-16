import { PhrasesProvider } from "@/lib/phrases-context";

export default function PhraseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhrasesProvider>{children}</PhrasesProvider>;
}
