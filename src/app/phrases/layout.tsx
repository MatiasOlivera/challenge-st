import { PhrasesProvider } from "@/features/phrases";

export default function PhraseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhrasesProvider>{children}</PhrasesProvider>;
}
